import type { Receta } from '../../../types/api'
import type { PdfAction } from '../types'
import { formatDate } from '../utils'
import { EmptyState } from './Shared'

type RecetasTabProps = {
  recetas: Receta[]
  loading: boolean
  downloadingKey: string
  onPdf: PdfAction
}

export function RecetasTab({ recetas, loading, downloadingKey, onPdf }: RecetasTabProps) {
  if (loading) return <EmptyState title="Cargando recetas..." />
  if (recetas.length === 0) return <EmptyState title="No hay recetas para esta ficha" />

  return (
    <div className="space-y-4">
      {recetas.map((receta) => {
        const path = `/recetas/${receta.id}/pdf`
        const filename = `receta-${receta.id}.pdf`
        return (
          <article key={receta.id} className="rounded-lg border border-slate-200 p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-950">Receta #{receta.id}</h3>
                <p className="mt-1 text-sm text-slate-500">{formatDate(receta.fechaCreacion)}</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onPdf(`receta-open-${receta.id}`, path, filename, 'open')}
                  className="portal-secondary-button"
                  disabled={downloadingKey === `receta-open-${receta.id}`}
                >
                  {downloadingKey === `receta-open-${receta.id}` ? 'Abriendo...' : 'Ver/Imprimir'}
                </button>
                <button
                  type="button"
                  onClick={() => onPdf(`receta-${receta.id}`, path, filename, 'download')}
                  className="portal-primary-button"
                  disabled={downloadingKey === `receta-${receta.id}`}
                >
                  {downloadingKey === `receta-${receta.id}` ? 'Descargando...' : 'Descargar'}
                </button>
              </div>
            </div>
            <div className="mt-4 overflow-hidden rounded-md border border-slate-200">
              {receta.detalles.map((detalle) => (
                <div key={detalle.id} className="grid gap-2 border-b border-slate-200 p-3 last:border-b-0 sm:grid-cols-[1.2fr_1fr_1fr]">
                  <strong className="text-sm text-slate-950">{detalle.medicamento}</strong>
                  <span className="text-sm text-slate-600">{detalle.dosis ?? 'Sin dosis'}</span>
                  <span className="text-sm text-slate-600">{detalle.frecuencia ?? 'Sin frecuencia'}</span>
                </div>
              ))}
            </div>
            {receta.indicacionesGenerales ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">{receta.indicacionesGenerales}</p>
            ) : null}
          </article>
        )
      })}
    </div>
  )
}
