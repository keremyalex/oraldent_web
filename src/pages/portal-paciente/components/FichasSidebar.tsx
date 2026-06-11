import type { FichaClinica } from '../../../types/api'
import { formatDate } from '../utils'

type FichasSidebarProps = {
  fichas: FichaClinica[]
  selectedFicha: FichaClinica | null
  loading: boolean
  onSelect: (id: number) => void
}

export function FichasSidebar({ fichas, selectedFicha, loading, onSelect }: FichasSidebarProps) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-sm shadow-blue-950/5">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-slate-950">Fichas</h2>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
          {fichas.length}
        </span>
      </div>
      <div className="mt-3 space-y-2">
        {loading ? <p className="text-sm text-slate-500">Cargando fichas...</p> : null}
        {!loading && fichas.length === 0 ? (
          <p className="text-sm text-slate-500">Todavía no hay fichas clínicas registradas.</p>
        ) : null}
        {fichas.map((ficha, index) => (
          <button
            key={ficha.id}
            type="button"
            onClick={() => onSelect(ficha.id)}
            className={`w-full rounded-md border px-3 py-3 text-left transition ${
              selectedFicha?.id === ficha.id
                ? 'border-[#00478d] bg-blue-50'
                : 'border-slate-200 bg-white hover:border-[#00478d]'
            }`}
          >
            <span className="block text-sm font-bold text-slate-950">Ficha #{fichas.length - index}</span>
            <span className="mt-1 block text-xs font-medium text-slate-500">
              {formatDate(ficha.fecha)}
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
