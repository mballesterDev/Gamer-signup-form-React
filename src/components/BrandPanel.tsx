// Panel izquierdo: marca, titular y "ficha de jugador".
// TODO (lógica): los estados (PENDIENTE / OK) y el ID deben actualizarse
// en vivo según lo que el usuario escribe en el formulario.
import type { Row } from "../types.ts";

type Props = {
  rows: Row[];
  checkList: number;
};

export default function BrandPanel({ rows, checkList }: Props) {
  
  return (
    <aside className="brand">
      <div className="brand__logo">
        <span className="brand__hex" aria-hidden="true" />
        VOLTRIX
      </div>

      <h1 className="brand__title">
        <span className="brand__slashes">&gt;_</span>Entra en <br /> la arena
      </h1>
      <p className="brand__subtitle">Crea tu identidad de jugador</p>

      <div className="card-id">
        <div className="card-id__head">
          <span>ID de jugador</span>
          <span>{checkList} listo</span>
        </div>
        <p className="card-id__value">SIN ASIGNAR</p>
        <ul className="card-id__list">
          {rows.map((r) => (
            <li key={r.label} className="card-id__row">
              <span>{r.label}</span>
              <span className="card-id__dots" aria-hidden="true" />
              <span className={`card-id__status card-id__status--${r.status}`}>
                {r.status}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
