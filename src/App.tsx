import { useState, type FocusEvent, type FormEvent } from "react";
import BrandPanel from "./components/BrandPanel.tsx";
import SignUpForm from "./components/SignUpForm.tsx";
import type { FieldStatus, FormErrors, FormValues, Row } from "./types.ts";
import SuccessPanel from "./components/SuccessPanel.tsx";

const LABELS: Record<keyof FormValues, string> = {
  alias: "Alias",
  email: "Email",
  password: "Clave",
  confirm: "Confirmar",
  terms: "Términos",
};

const REGEX_ALIAS = /^[A-Za-z0-9_-]{3,16}$/;
const REGEX_MAIL = /^[\w.+-]+@[\w-]+\.[a-zA-Z]{2,}$/;
const REGEX_PASSWORD = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

// Solo calcula los errores: no toca ningún estado
const validate = (values: FormValues): FormErrors => {
  const { alias, email, password, confirm, terms } = values;
  const newErrors: FormErrors = {};

  if (!alias.trim()) {
    newErrors.alias = "El alias es obligatorio";
  } else if (!REGEX_ALIAS.test(alias)) {
    newErrors.alias = "3–16 caracteres: letras, números, _ o -";
  }

  if (!email.trim()) {
    newErrors.email = "El email es obligatorio";
  } else if (!REGEX_MAIL.test(email)) {
    newErrors.email = "El formato del correo no es válido";
  }

  if (!password) {
    newErrors.password = "La contraseña es obligatoria";
  } else if (!REGEX_PASSWORD.test(password)) {
    newErrors.password =
      "Mínimo 8 caracteres, con mayúscula, minúscula, número y símbolo";
  }

  if (!confirm) {
    newErrors.confirm = "Confirma tu contraseña";
  } else if (password !== confirm) {
    newErrors.confirm = "Las contraseñas no coinciden";
  }

  if (!terms) {
    newErrors.terms = "Debes aceptar los términos y la política de privacidad";
  }

  return newErrors;
};

// TODO (lógica): cuando el formulario se envíe con éxito,
// sustituye <SignUpForm /> por <SuccessPanel alias="..." />
export default function App() {
  const [data, setData] = useState<FormValues>({
    alias: "",
    email: "",
    password: "",
    confirm: "",
    terms: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [rows, setRows] = useState<Row[]>([
    { label: "Alias", status: "pendiente" },
    { label: "Email", status: "pendiente" },
    { label: "Clave", status: "pendiente" },
    { label: "Confirmar", status: "pendiente" },
    { label: "Términos", status: "requerido" },
  ]);

  const [submitted, setSubmitted] = useState(false);

  const aprobadas = rows.filter((r) => r.status === "ok").length;

  const setRowStatus = (label: string, status: FieldStatus) => {
    setRows((prev) =>
      prev.map((row) => (row.label === label ? { ...row, status } : row)),
    );
  };

  // Fila de la ficha que corresponde a cada campo
  const updateRow = (name: keyof FormValues, errs: FormErrors) => {
    /*
     * Tabla de decisión del status:
     *
     * ¿Hay error en name? | ¿Es terms? | status resultante
     * --------------------|------------|------------------
     * Sí                  | Sí         | "requerido"
     * Sí                  | No         | "pendiente"
     * No                  | —          | "ok"
     */
    const status: FieldStatus = errs[name]
      ? name === "terms"
        ? "requerido"
        : "pendiente"
      : "ok";
    setRowStatus(LABELS[name], status);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors = handleErrors();

    if (Object.keys(newErrors).length > 0) {
      return; // hay errores → no enviamos
    }

    setSubmitted(true);
  };

  const handleErrors = () => {
    const newErrors = validate(data);

    (Object.keys(LABELS) as (keyof FormValues)[]).forEach((name) =>
      updateRow(name, newErrors),
    );

    setErrors(newErrors);
    return newErrors;
  };

  // Al salir de un campo solo se actualiza el error de ese campo
  const handleBlur = (e: FocusEvent<HTMLInputElement>) => {
    const name = e.target.name as keyof FormValues; //saca el name dle input
    const allErrors = validate(data); // saca los errores
    setErrors((prev) => ({ ...prev, [name]: allErrors[name] })); //asigna el error al insput específico gracias  Acceso dinámico a propiedades de objetos: allErrors[name
    updateRow(name, allErrors); //se actualiza esa fila especifica
  };

  return (
    <main className="page">
      <div className="grid-bg" aria-hidden="true" />
      <section className="shell">
        <BrandPanel rows={rows} checkList={aprobadas} />
        {submitted ? (
          <SuccessPanel alias={data.alias} />
        ) : (
          <SignUpForm
            data={data}
            setData={setData}
            errors={errors}
            onSubmit={handleSubmit}
            onBlur={handleBlur}
          />
        )}
      </section>
    </main>
  );
}
