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
  paciente: Paciente
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
  pacienteId?: number | null
  paciente?: {
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

export type Paciente = {
  id: number
  codigoPaciente: string
  nombre: string
  apellidoPaterno: string
  apellidoMaterno: string | null
  celular: string
  documentoIdentidad: string
  correo: string | null
  fechaNacimiento: string | null
  direccion: string | null
  fotoUrl: string | null
  activo: boolean
  fechaCreacion: string
  fechaActualizacion: string
}

export type PortalPacienteAccessPayload = {
  codigoPaciente: string
  documentoIdentidad: string
}

export type PortalPacienteAccessResponse = {
  token: string
  tipoToken: string
  paciente: Paciente
}

export type Anamnesis = {
  id: number
  fichaClinicaId: number
  hemorragia: boolean | null
  diabetes: boolean | null
  alergias: string | null
  hipertension: boolean | null
  problemasCardiovasculares: boolean | null
  epilepsia: boolean | null
  lipotimias: boolean | null
  tratamientoMedico: string | null
  medicacionActual: string | null
  otrasPatologias: string | null
  observaciones: string | null
}

export type FichaClinica = {
  id: number
  paciente: Paciente
  usuarioId: number | null
  citaId: number | null
  fecha: string
  edad: number | null
  sexo: string | null
  procedencia: string | null
  ocupacion: string | null
  presionArterial: string | null
  temperatura: number | null
  pulso: number | null
  motivoConsulta: string | null
  enfermedadActual: string | null
  anamnesis: Anamnesis | null
  examenClinico: string | null
  examenRadiografico: string | null
  diagnostico: string | null
  tratamiento: string | null
  tecnicaAnestesia: string | null
  evolucion: string | null
  activo: boolean
  odontogramaId: number | null
  periodontogramaId: number | null
  fechaCreacion: string
  fechaActualizacion: string
}

export type RecetaDetalle = {
  id: number
  medicamento: string
  dosis: string | null
  frecuencia: string | null
  duracion: string | null
  indicaciones: string | null
  orden: number | null
}

export type Receta = {
  id: number
  fichaClinicaId: number
  usuarioId: number | null
  indicacionesGenerales: string | null
  observaciones: string | null
  activo: boolean
  detalles: RecetaDetalle[]
  fechaCreacion: string
  fechaActualizacion: string
}

export type Radiografia = {
  id: number
  fichaClinicaId: number
  titulo: string
  descripcion: string | null
  tipo: string | null
  numeroFdi: number | null
  zona: string | null
  imagenUrl: string | null
  imagenPublicId: string | null
  nombreArchivo: string | null
  formato: string | null
  tamanoBytes: number | null
  anchoPx: number | null
  altoPx: number | null
  fechaEstudio: string | null
  diagnosticoRadiografico: string | null
  perdidaOseaObservada: boolean | null
  tipoPerdidaOsea: string | null
  severidadPerdidaOsea: string | null
  porcentajePerdidaOseaEstimado: number | null
  nivelCrestaOseaMm: number | null
  observacionesPeriodontales: string | null
  activo: boolean
  fechaCreacion: string
  fechaActualizacion: string
}


export type PortalCita = {
  id: number
  paciente: Paciente
  usuarioRegistradorId: number | null
  servicio: Servicio | null
  fechaHoraInicio: string
  fechaHoraFin: string
  motivo: string | null
  estado: string
  codigoGestion: string
  notas: string | null
  fechaCreacion: string
  fechaActualizacion: string
}
