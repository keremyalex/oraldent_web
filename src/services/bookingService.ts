import { apiRequest } from './http'
import type { Cita, CrearCitaPayload, Disponibilidad, Servicio } from '../types/api'

export function getServicios() {
  return apiRequest<Servicio[]>('/api/servicios')
}

export function getDisponibilidad(fecha: string) {
  return apiRequest<Disponibilidad>(`/api/citas/disponibilidad?fecha=${fecha}`)
}

export function crearCita(payload: CrearCitaPayload) {
  return apiRequest<Cita>('/api/citas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
