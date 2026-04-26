export type Servicio = {
  id: number
  nombre: string
  descripcion: string
  activo: boolean
}

export type Disponibilidad = {
  fecha: string
  horariosDisponibles: string[]
}

export type Cita = {
  id: number
  fechaHoraInicio: string
  codigoGestion: string
  estado: string
  servicio: Servicio
}

export type ApiError = {
  message?: string
  validationErrors?: Record<string, string>
}

export type PacienteForm = {
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string
  celular: string
  documentoIdentidad: string
  correo: string
  fechaNacimiento: string
  direccion: string
  motivo: string
}

export type CrearCitaPayload = {
  paciente: {
    nombre: string
    apellidoPaterno: string
    apellidoMaterno: string | null
    celular: string
    documentoIdentidad: string | null
    correo: string | null
    fechaNacimiento: string | null
    direccion: string | null
    fotoUrl: string | null
  }
  servicioId: number
  fechaHoraInicio: string
  motivo: string
  notas: string | null
}
