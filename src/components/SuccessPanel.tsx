type SuccessPanelProps = {
  alias?: string
}

// Pantalla de éxito (ya maquetada). Muéstrala tras el envío simulado.
export default function SuccessPanel({ alias = 'Nova_92' }: SuccessPanelProps) {
  return (
    <div className="panel panel--success" role="status" aria-live="polite">
      <span className="panel__corner panel__corner--tl" aria-hidden="true" />
      <span className="panel__corner panel__corner--br" aria-hidden="true" />
      <svg className="success__icon" viewBox="0 0 80 80" aria-hidden="true">
        <polygon points="40,4 72,22 72,58 40,76 8,58 8,22" fill="none" stroke="currentColor" strokeWidth="3" />
        <path d="M26 41l9 9 19-20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <h2 className="success__title">¡Cuenta creada!</h2>
      <p className="success__text">Bienvenido a la arena, <strong>{alias}</strong>. Revisa tu correo para activar el perfil.</p>
      <button type="button" className="btn">Ir al lobby</button>
    </div>
  )
}
