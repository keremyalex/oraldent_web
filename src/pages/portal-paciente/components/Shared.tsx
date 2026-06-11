import type { ReactNode } from 'react'

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <span className="mt-2 block">{children}</span>
    </label>
  )
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
      {children}
    </div>
  )
}

export function EmptyState({ title }: { title: string }) {
  return (
    <div className="rounded-lg border border-dashed border-slate-300 bg-slate-50 px-4 py-10 text-center text-sm font-semibold text-slate-500">
      {title}
    </div>
  )
}

export function SectionCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <article className="rounded-lg border border-slate-200 p-4">
      <h3 className="text-base font-bold text-slate-950">{title}</h3>
      <div className="mt-4 space-y-3">{children}</div>
    </article>
  )
}

export function InfoGrid({ items }: { items: Array<[string, string | number | null | undefined]> }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2">
      {items.map(([label, value]) => (
        <InfoRow key={label} label={label} value={value} />
      ))}
    </dl>
  )
}

export function InfoRow({
  label,
  value,
}: {
  label: string
  value: string | number | null | undefined
}) {
  return (
    <div>
      <dt className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</dt>
      <dd className="mt-1 text-sm font-semibold text-slate-800">{value || 'No registrado'}</dd>
    </div>
  )
}

export function TextBlock({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wide text-slate-400">{label}</p>
      <p className="mt-1 text-sm leading-6 text-slate-700">{value || 'No registrado'}</p>
    </div>
  )
}
