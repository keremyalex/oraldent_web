import type { Paciente } from '../../types/api'

export const portalTokenKey = 'oraldent_portal_token'

export function getFullName(paciente: Paciente) {
  return [paciente.nombre, paciente.apellidoPaterno, paciente.apellidoMaterno]
    .filter(Boolean)
    .join(' ')
}

export function getInitials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join('')
}

export function formatDateTime(value?: string | null) {
  if (!value) return 'No registrado'
  return new Intl.DateTimeFormat('es-BO', { dateStyle: 'medium', timeStyle: 'short' }).format(
    new Date(value),
  )
}

export function formatDate(value?: string | null) {
  if (!value) return 'No registrado'
  return new Intl.DateTimeFormat('es-BO', { dateStyle: 'medium' }).format(parseDateValue(value))
}

function parseDateValue(value: string) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value)
  if (match) {
    return new Date(Number(match[1]), Number(match[2]) - 1, Number(match[3]))
  }
  return new Date(value)
}

export function formatEstado(value: string) {
  return value.replaceAll('_', ' ').toLowerCase().replace(/^./, (letter) => letter.toUpperCase())
}

export function getEstadoCitaClass(value: string) {
  if (value === 'CANCELADA' || value === 'NO_ASISTIO') return 'bg-red-50 text-red-700'
  if (value === 'ATENDIDA') return 'bg-emerald-50 text-emerald-700'
  if (value === 'REPROGRAMADA') return 'bg-amber-50 text-amber-700'
  return 'bg-blue-50 text-blue-700'
}

export function boolText(value?: boolean | null) {
  if (value === true) return 'Sí'
  if (value === false) return 'No'
  return null
}
