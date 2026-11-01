import React, { type Dispatch, type SetStateAction } from "react";
import type { FormErrors, FormValues } from "../types";

type Props = {
  data: FormValues;
  setData: Dispatch<SetStateAction<FormValues>>;
  errors: FormErrors;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

export default function SignUpForm({
  data,
  setData,
  errors,
  onSubmit,
  onBlur,
}: Props) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.type === "checkbox") {
      setData((prev) => ({ ...prev, terms: !prev.terms }));
    } else {
      setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  return (
    <form className="panel" noValidate onSubmit={onSubmit}>
      <span className="panel__corner panel__corner--tl" aria-hidden="true" />
      <span className="panel__corner panel__corner--br" aria-hidden="true" />

      <header className="panel__head">
        <span>Nuevo jugador</span>
        <span className="panel__muted">Todos los campos son obligatorios</span>
      </header>

      <div className="field">
        <label htmlFor="alias" className="field__label">
          <span className="field__mark">◆</span> Alias
        </label>
        <input
          id="alias"
          name="alias"
          value={data.alias}
          onChange={handleChange}
          onBlur={onBlur}
          className="field__input"
          placeholder="ej. Nova_92"
          autoComplete="username"
          aria-describedby="alias-hint"
        />
        <p id="alias-hint" className="field__hint">
          3–16 caracteres: letras, números, _ o -
        </p>
        {errors.alias ? <p className="field__error">{errors.alias}</p> : ""}
      </div>

      <div className="field">
        <label htmlFor="email" className="field__label">
          <span className="field__mark">◆</span> Email
        </label>
        <input
          id="email"
          name="email"
          value={data.email}
          onChange={handleChange}
          onBlur={onBlur}
          type="email"
          className="field__input"
          placeholder="tu@correo.com"
          autoComplete="email"
          aria-describedby="email-hint"
        />
        <p id="email-hint" className="field__hint">
          &nbsp;
        </p>
        {errors.email ? <p className="field__error">{errors.email}</p> : ""}
      </div>

      {/* TODO (lógica): botón de ojo → alternar type="password" / "text" con un useState */}
      <div className="field">
        <label htmlFor="password" className="field__label">
          <span className="field__mark">◆</span> Contraseña
        </label>
        <div className="field__wrap">
          <input
            id="password"
            name="password"
            value={data.password}
            onChange={handleChange}
            onBlur={onBlur}
            type="password"
            className="field__input"
            autoComplete="new-password"
            aria-describedby="password-hint"
          />
          <button
            type="button"
            className="field__eye"
            aria-label="Mostrar contraseña"
            aria-pressed="false"
          >
            <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
              <path
                d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12Z"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <circle
                cx="12"
                cy="12"
                r="3"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
              />
            </svg>
          </button>
        </div>
        <p id="password-hint" className="field__hint">
          Mínimo 8 caracteres
        </p>
        {errors.password ? (
          <p className="field__error">{errors.password}</p>
        ) : (
          ""
        )}
      </div>

      <div className="field">
        <label htmlFor="confirm" className="field__label">
          <span className="field__mark">◆</span> Confirmar contraseña
        </label>
        <input
          id="confirm"
          name="confirm"
          value={data.confirm}
          onChange={handleChange}
          onBlur={onBlur}
          type="password"
          className="field__input"
          autoComplete="new-password"
          aria-describedby="confirm-hint"
        />
        <p id="confirm-hint" className="field__hint">
          &nbsp;
        </p>
        {errors.confirm ? <p className="field__error">{errors.confirm}</p> : ""}
      </div>

      <label className="check">
        <input
          type="checkbox"
          name="terms"
          checked={data.terms}
          onChange={handleChange}
          onBlur={onBlur}
          className="check__input"
        />
        <span className="check__box" aria-hidden="true" />
        <span>
          Acepto los <a href="#">Términos</a> y la{" "}
          <a href="#">Política de privacidad</a>.
        </span>
      </label>
      {errors.terms ? <p className="field__error">{errors.terms}</p> : ""}

      {/* Añade la clase "btn--loading" mientras simulas el envío */}
      <button type="submit" className="btn">
        <span className="btn__text">Crear cuenta</span>
        <span className="btn__spinner" aria-hidden="true" />
      </button>

      <p className="panel__foot">
        ¿Ya juegas con nosotros? <a href="#">Inicia sesión</a>
      </p>
    </form>
  );
}
