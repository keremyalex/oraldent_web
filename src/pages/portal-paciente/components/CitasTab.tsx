import type { PortalCita } from '../../../types/api'
import { formatDateTime, formatEstado, getEstadoCitaClass } from '../utils'
import { EmptyState, InfoRow } from './Shared'

type CitasTabProps = {
  citas: PortalCita[]
  loading: boolean
  cancellingId: number | null
  onCancel: (cita: PortalCita) => void
}

export function CitasTab({ citas, loading, cancellingId, onCancel }: CitasTabProps) {
  if (loading) return <EmptyState title="Cargando citas..." />
  if (citas.length === 0) return <EmptyState title="No hay citas registradas" />

  return (
    <div className="space-y-3">
      {citas.map((cita) => {
        const canCancel = cita.estado === 'PENDIENTE' || cita.estado === 'REPROGRAMADA'
        return (
          <article key={cita.id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-950">
                  {cita.servicio?.nombre ?? 'Cita odontológica'}
                </h3>
                <p className="mt-1 text-sm font-semibold text-[#006687]">
                  {formatDateTime(cita.fechaHoraInicio)}
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <span className={`inline-flex w-fit rounded-full px-3 py-1 text-xs font-bold ${getEstadoCitaClass(cita.estado)}`}>
                  {formatEstado(cita.estado)}
                </span>
                {canCancel ? (
                  <button
                    type="button"
                    onClick={() => onCancel(cita)}
                    disabled={cancellingId === cita.id}
                    className="portal-danger-button"
                  >
                    {cancellingId === cita.id ? 'Cancelando...' : 'Cancelar'}
                  </button>
                ) : null}
              </div>
            </div>
            <div className="mt-4 grid gap-3 text-sm sm:grid-cols-3">
              <InfoRow label="Código" value={cita.codigoGestion} />
              <InfoRow label="Motivo" value={cita.motivo} />
              <InfoRow label="Fin" value={formatDateTime(cita.fechaHoraFin)} />
            </div>
          </article>
        )
      })}
    </div>
  )
}
