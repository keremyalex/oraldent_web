import type { Radiografia } from '../../../types/api'
import { formatDate } from '../utils'
import { EmptyState } from './Shared'

export function RadiografiasTab({
  radiografias,
  loading,
}: {
  radiografias: Radiografia[]
  loading: boolean
}) {
  if (loading) return <EmptyState title="Cargando radiografías..." />
  if (radiografias.length === 0) return <EmptyState title="No hay radiografías para esta ficha" />

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {radiografias.map((radiografia) => (
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
              {radiografia.tipo ?? 'Radiografía'} · {formatDate(radiografia.fechaEstudio)}
            </p>
            {radiografia.diagnosticoRadiografico ? (
              <p className="mt-3 text-sm leading-6 text-slate-600">{radiografia.diagnosticoRadiografico}</p>
            ) : null}
          </div>
        </article>
      ))}
    </div>
  )
}
