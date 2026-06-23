import { useEffect, useMemo, useState } from 'react'
import type { FormEvent } from 'react'
import { CitasTab } from './portal-paciente/components/CitasTab'
import { FichaSummary } from './portal-paciente/components/FichaSummary'
import { FichasSidebar } from './portal-paciente/components/FichasSidebar'
import { LoginView } from './portal-paciente/components/LoginView'
import { PatientCard } from './portal-paciente/components/PatientCard'
import { PortalHeader } from './portal-paciente/components/PortalHeader'
import { PortalTabs } from './portal-paciente/components/PortalTabs'
import { RadiografiasTab } from './portal-paciente/components/RadiografiasTab'
import { RecetasTab } from './portal-paciente/components/RecetasTab'
import { ReportesTab } from './portal-paciente/components/ReportesTab'
import { EmptyState, Notice } from './portal-paciente/components/Shared'
import type { PortalTab } from './portal-paciente/types'
import { formatDate, portalTokenKey } from './portal-paciente/utils'
import {
  accederPortalPaciente,
  cancelarPortalCita,
  descargarPortalPdf,
  getPortalCitas,
  getPortalFichas,
  getPortalPerfil,
  getPortalRadiografias,
  getPortalRecetas,
} from '../services/portalPacienteService'
import type { FichaClinica, Paciente, PortalCita, Radiografia, Receta } from '../types/api'

function PortalPacientePage() {
  const [token, setToken] = useState(() => localStorage.getItem(portalTokenKey) ?? '')
  const [accessForm, setAccessForm] = useState({ codigoPaciente: '', documentoIdentidad: '' })
  const [paciente, setPaciente] = useState<Paciente | null>(null)
  const [fichas, setFichas] = useState<FichaClinica[]>([])
  const [citas, setCitas] = useState<PortalCita[]>([])
  const [selectedFichaId, setSelectedFichaId] = useState<number | null>(null)
  const [recetas, setRecetas] = useState<Receta[]>([])
  const [radiografias, setRadiografias] = useState<Radiografia[]>([])
  const [activeTab, setActiveTab] = useState<PortalTab>('historial')
  const [loadingAccess, setLoadingAccess] = useState(false)
  const [loadingPortal, setLoadingPortal] = useState(false)
  const [loadingFichaData, setLoadingFichaData] = useState(false)
  const [downloadingKey, setDownloadingKey] = useState('')
  const [cancellingId, setCancellingId] = useState<number | null>(null)
  const [error, setError] = useState('')

  const selectedFicha = useMemo(
    () => fichas.find((ficha) => ficha.id === selectedFichaId) ?? fichas[0] ?? null,
    [fichas, selectedFichaId],
  )

  useEffect(() => {
    if (!token) {
      clearPortalData()
      return
    }

    void loadPortal(token)
  }, [token])

  useEffect(() => {
    if (!token || !selectedFicha) {
      setRecetas([])
      setRadiografias([])
      return
    }

    void loadFichaData(token, selectedFicha.id)
  }, [token, selectedFicha])

  async function loadPortal(currentToken: string) {
    setLoadingPortal(true)
    setError('')
    try {
      const [perfil, fichaData, citaData] = await Promise.all([
        getPortalPerfil(currentToken),
        getPortalFichas(currentToken),
        getPortalCitas(currentToken),
      ])
      const sortedFichas = [...fichaData].sort(
        (a, b) => new Date(b.fecha).getTime() - new Date(a.fecha).getTime(),
      )
      setPaciente(perfil)
      setFichas(sortedFichas)
      setCitas(citaData)
      setSelectedFichaId((current) => current ?? sortedFichas[0]?.id ?? null)
    } catch (portalError) {
      cerrarSesion()
      setError(
        portalError instanceof Error
          ? portalError.message
          : 'No se pudo cargar el portal del paciente.',
      )
    } finally {
      setLoadingPortal(false)
    }
  }

  async function loadFichaData(currentToken: string, fichaId: number) {
    setLoadingFichaData(true)
    try {
      const [recetaData, radiografiaData] = await Promise.all([
        getPortalRecetas(currentToken, fichaId),
        getPortalRadiografias(currentToken, fichaId),
      ])
      setRecetas(recetaData)
      setRadiografias(radiografiaData)
    } catch (fichaError) {
      setRecetas([])
      setRadiografias([])
      setError(
        fichaError instanceof Error
          ? fichaError.message
          : 'No se pudo cargar el contenido de la ficha seleccionada.',
      )
    } finally {
      setLoadingFichaData(false)
    }
  }

  async function submitAccess(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setLoadingAccess(true)
    try {
      const response = await accederPortalPaciente({
        codigoPaciente: accessForm.codigoPaciente.trim(),
        documentoIdentidad: accessForm.documentoIdentidad.trim(),
      })
      localStorage.setItem(portalTokenKey, response.token)
      setPaciente(response.paciente)
      setToken(response.token)
      setAccessForm({ codigoPaciente: '', documentoIdentidad: '' })
    } catch (accessError) {
      setError(accessError instanceof Error ? accessError.message : 'No se pudo ingresar al portal.')
    } finally {
      setLoadingAccess(false)
    }
  }

  function cerrarSesion() {
    localStorage.removeItem(portalTokenKey)
    setToken('')
    clearPortalData()
  }

  function clearPortalData() {
    setPaciente(null)
    setFichas([])
    setCitas([])
    setSelectedFichaId(null)
    setRecetas([])
    setRadiografias([])
  }

  async function handleCancelCita(cita: PortalCita) {
    const confirmed = window.confirm('¿Quieres cancelar esta cita?')
    if (!confirmed) return

    setCancellingId(cita.id)
    setError('')
    try {
      await cancelarPortalCita(cita.id, cita.codigoGestion)
      if (token) {
        const citaData = await getPortalCitas(token)
        setCitas(citaData)
      }
    } catch (cancelError) {
      setError(cancelError instanceof Error ? cancelError.message : 'No se pudo cancelar la cita.')
    } finally {
      setCancellingId(null)
    }
  }

  async function handlePdf(key: string, path: string, filename: string, mode: 'download' | 'open') {
    if (!token) return
    setDownloadingKey(key)
    setError('')
    try {
      const blob = await descargarPortalPdf(token, path)
      const url = URL.createObjectURL(blob)

      if (mode === 'open') {
        const opened = window.open(url, '_blank', 'noopener,noreferrer')
        if (!opened) {
          setError('El navegador bloqueó la ventana del PDF. Habilita ventanas emergentes o usa Descargar.')
        }
        window.setTimeout(() => URL.revokeObjectURL(url), 60_000)
        return
      }

      const anchor = document.createElement('a')
      anchor.href = url
      anchor.download = filename
      document.body.appendChild(anchor)
      anchor.click()
      anchor.remove()
      URL.revokeObjectURL(url)
    } catch (downloadError) {
      setError(downloadError instanceof Error ? downloadError.message : 'No se pudo obtener el PDF.')
    } finally {
      setDownloadingKey('')
    }
  }

  if (!token) {
    return (
      <main className="min-h-screen bg-[#f7f9fc] text-slate-900">
        <PortalHeader />
        <LoginView
          accessForm={accessForm}
          error={error}
          loadingAccess={loadingAccess}
          onSubmit={submitAccess}
          onChange={setAccessForm}
        />
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-slate-900">
      <PortalHeader
        action={<button onClick={cerrarSesion} className="portal-secondary-button">Salir</button>}
      />

      <section className="mx-auto max-w-7xl px-5 py-6 sm:px-8">
        {error ? <Notice>{error}</Notice> : null}

        <div className="grid gap-5 lg:grid-cols-[330px_1fr]">
          <aside className="space-y-5">
            <PatientCard paciente={paciente} loading={loadingPortal} />
            <FichasSidebar
              fichas={fichas}
              selectedFicha={selectedFicha}
              loading={loadingPortal}
              onSelect={setSelectedFichaId}
            />
          </aside>

          <section className="min-w-0 rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-blue-950/5 sm:p-5">
            <div className="flex flex-col gap-4 border-b border-slate-200 pb-4 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-wide text-[#006687]">
                  Historial clínico
                </p>
                <h1 className="mt-1 text-2xl font-bold tracking-normal text-slate-950">
                  {selectedFicha ? `Ficha del ${formatDate(selectedFicha.fecha)}` : 'Sin ficha seleccionada'}
                </h1>
              </div>
              <PortalTabs activeTab={activeTab} onChange={setActiveTab} />
            </div>

            <div className="pt-5">
              {!selectedFicha && activeTab !== 'citas' ? <EmptyState title="No hay ficha clínica" /> : null}
              {selectedFicha && activeTab === 'historial' ? <FichaSummary ficha={selectedFicha} /> : null}
              {activeTab === 'citas' ? (
                <CitasTab
                  citas={citas}
                  loading={loadingPortal}
                  cancellingId={cancellingId}
                  onCancel={handleCancelCita}
                />
              ) : null}
              {selectedFicha && activeTab === 'recetas' ? (
                <RecetasTab
                  recetas={recetas}
                  loading={loadingFichaData}
                  downloadingKey={downloadingKey}
                  onPdf={handlePdf}
                />
              ) : null}
              {selectedFicha && activeTab === 'radiografias' ? (
                <RadiografiasTab
                  radiografias={radiografias}
                  loading={loadingFichaData}
                  downloadingKey={downloadingKey}
                  onPdf={handlePdf}
                />
              ) : null}
              {selectedFicha && activeTab === 'reportes' ? (
                <ReportesTab ficha={selectedFicha} downloadingKey={downloadingKey} onPdf={handlePdf} />
              ) : null}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}

export default PortalPacientePage
