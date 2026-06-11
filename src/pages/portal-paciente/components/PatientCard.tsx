import type { Paciente } from '../../../types/api'
import { formatDate, getFullName, getInitials } from '../utils'
import { InfoRow } from './Shared'

export function PatientCard({ paciente, loading }: { paciente: Paciente | null; loading: boolean }) {
  const fullName = paciente ? getFullName(paciente) : 'Paciente'
  return (
    <div className="rounded-lg border border-[#b8e2e5] bg-[#e9f8f7] p-5 shadow-sm shadow-cyan-950/5">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white text-lg font-bold text-[#006687] ring-1 ring-[#b8e2e5]">
          {paciente?.fotoUrl ? (
            <img src={paciente.fotoUrl} alt={fullName} className="h-full w-full object-cover" />
          ) : (
            getInitials(fullName)
          )}
        </div>
        <div className="min-w-0">
          <p className="truncate text-lg font-bold text-slate-950">
            {loading ? 'Cargando...' : fullName}
          </p>
          <p className="text-sm font-semibold text-[#006687]">
            {paciente?.codigoPaciente ?? 'Código paciente'}
          </p>
        </div>
      </div>
      <dl className="mt-5 grid gap-3 text-sm">
        <InfoRow label="CI" value={paciente?.documentoIdentidad} />
        <InfoRow label="Celular" value={paciente?.celular} />
        <InfoRow label="Nacimiento" value={formatDate(paciente?.fechaNacimiento)} />
      </dl>
    </div>
  )
}
