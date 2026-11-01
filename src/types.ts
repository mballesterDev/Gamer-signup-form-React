export type FormValues = {
  alias: string
  email: string
  password: string
  confirm: string
  terms: boolean
}

// Un mensaje de error por campo (si no hay error, no existe la clave)
export type FormErrors = {
  alias?: string
  email?: string
  password?: string
  confirm?: string
  terms?: string
}


export type FieldStatus = 'pendiente' | 'requerido' | 'ok'

export type Row = {
  label: string
  status: FieldStatus
}
