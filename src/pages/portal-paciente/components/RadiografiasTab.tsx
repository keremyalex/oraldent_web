import type { Radiografia } from '../../../types/api'
import type { PdfAction } from '../types'
import { formatDate } from '../utils'
import { EmptyState } from './Shared'

type RadiografiasTabProps = {
  radiografias: Radiografia[]
  loading: boolean
  downloadingKey: string
  onPdf: PdfAction
}

export function RadiografiasTab({
  radiografias,
  loading,
  downloadingKey,
  onPdf,
}: RadiografiasTabProps) {
  if (loading) return <EmptyState title="Cargando radiografias..." />
  if (radiografias.length === 0) return <EmptyState title="No hay radiografias para esta ficha" />

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {radiografias.map((radiografia) => {
        const path = `/radiografias/${radiografia.id}/pdf`
        const filename = `radiografia-${radiografia.id}.pdf`
        return (
          <article key={radiografia.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white">
            <div className="aspect-[4/3] bg-slate-100">
              {radiografia.imagenUrl ? (
                <img src={radiografia.imagenUrl} alt={radiografia.titulo} className="h-full w-full object-cover" />
              ) : (
                <div className="flex h-full items-center justify-center text-sm font-semibold text-slate-400">Sin imagen</div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-slate-950">{radiografia.titulo}</h3>
              <p className="mt-1 text-sm text-slate-500">
                {radiografia.tipo ?? 'Radiografia'} - {formatDate(radiografia.fechaEstudio)}
              </p>
              {radiografia.diagnosticoRadiografico ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">{radiografia.diagnosticoRadiografico}</p>
              ) : null}
              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => onPdf(`radiografia-open-${radiografia.id}`, path, filename, 'open')}
                  disabled={downloadingKey === `radiografia-open-${radiografia.id}`}
                  className="portal-secondary-button"
                >
                  {downloadingKey === `radiografia-open-${radiografia.id}` ? 'Abriendo...' : 'Ver/Imprimir'}
                </button>
                <button
                  type="button"
                  onClick={() => onPdf(`radiografia-${radiografia.id}`, path, filename, 'download')}
                  disabled={downloadingKey === `radiografia-${radiografia.id}`}
                  className="portal-primary-button"
                >
                  {downloadingKey === `radiografia-${radiografia.id}` ? 'Descargando...' : 'Descargar'}
                </button>
              </div>
            </div>
          </article>
        )
      })}
    </div>
  )
}
