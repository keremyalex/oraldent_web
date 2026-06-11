import { apiBlobRequest, apiRequest } from './http'
import type {
  FichaClinica,
  Paciente,
  CrearCitaPayload,
  PortalCita,
  PortalPacienteAccessPayload,
  PortalPacienteAccessResponse,
  Radiografia,
  Receta,
} from '../types/api'

const portalBase = '/api/portal-paciente'

function authHeaders(token: string): HeadersInit {
  return { Authorization: `Bearer ${token}` }
}

export function accederPortalPaciente(payload: PortalPacienteAccessPayload) {
  return apiRequest<PortalPacienteAccessResponse>(`${portalBase}/acceso`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}

export function getPortalPerfil(token: string) {
  return apiRequest<Paciente>(`${portalBase}/perfil`, { headers: authHeaders(token) })
}

export function getPortalCitas(token: string) {
  return apiRequest<PortalCita[]>(`${portalBase}/citas`, { headers: authHeaders(token) })
}

export function getPortalFichas(token: string) {
  return apiRequest<FichaClinica[]>(`${portalBase}/fichas`, { headers: authHeaders(token) })
}

export function getPortalRecetas(token: string, fichaId: number) {
  return apiRequest<Receta[]>(`${portalBase}/fichas/${fichaId}/recetas`, {
    headers: authHeaders(token),
  })
}

export function getPortalRadiografias(token: string, fichaId: number) {
  return apiRequest<Radiografia[]>(`${portalBase}/fichas/${fichaId}/radiografias`, {
    headers: authHeaders(token),
  })
}

export function descargarPortalPdf(token: string, path: string) {
  return apiBlobRequest(`${portalBase}${path}`, { headers: authHeaders(token) })
}


export function cancelarPortalCita(citaId: number, codigoGestion: string) {
  return apiRequest<PortalCita>(`/api/citas/${citaId}/cancelar`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigoGestion }),
  })
}


export function crearPortalCita(token: string, payload: CrearCitaPayload) {
  return apiRequest<PortalCita>(`${portalBase}/citas`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
}
