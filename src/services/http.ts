import { API_BASE_URL } from '../config/env'
import type { ApiError } from '../types/api'

export async function apiRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, options)

  if (!response.ok) {
    throw await buildApiError(response)
  }

  return response.json() as Promise<T>
}

export async function apiBlobRequest(path: string, options?: RequestInit): Promise<Blob> {
  const response = await fetch(`${API_BASE_URL}${path}`, options)

  if (!response.ok) {
    throw await buildApiError(response)
  }

  return response.blob()
}

async function buildApiError(response: Response) {
  const apiError = (await response.json().catch(() => null)) as ApiError | null
  const validationMessage = apiError?.validationErrors
    ? Object.values(apiError.validationErrors).join(' ')
    : ''

  return new Error(apiError?.message ?? validationMessage ?? 'No se pudo completar la solicitud.')
}
