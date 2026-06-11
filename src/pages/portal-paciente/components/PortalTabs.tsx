import type { ReactNode } from 'react'
import type { PortalTab } from '../types'

type PortalTabsProps = {
  activeTab: PortalTab
  onChange: (tab: PortalTab) => void
}

const tabs: Array<{ id: PortalTab; label: string }> = [
  { id: 'historial', label: 'Ficha' },
  { id: 'citas', label: 'Citas' },
  { id: 'recetas', label: 'Recetas' },
  { id: 'radiografias', label: 'Radiografías' },
  { id: 'reportes', label: 'Reportes' },
]

export function PortalTabs({ activeTab, onChange }: PortalTabsProps) {
  return (
    <div className="grid grid-cols-2 gap-2 rounded-lg bg-slate-100 p-1 sm:flex">
      {tabs.map((tab) => (
        <TabButton key={tab.id} active={activeTab === tab.id} onClick={() => onChange(tab.id)}>
          {tab.label}
        </TabButton>
      ))}
    </div>
  )
}

function TabButton({ active, onClick, children }: { active: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-md px-3 py-2 text-sm font-bold transition ${
        active ? 'bg-white text-[#00478d] shadow-sm' : 'text-slate-500 hover:text-slate-900'
      }`}
    >
      {children}
    </button>
  )
}
