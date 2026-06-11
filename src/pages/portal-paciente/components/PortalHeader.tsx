import type { ReactNode } from 'react'
import logo from '../../../assets/logo.png'

export function PortalHeader({ action }: { action?: ReactNode }) {
  return (
    <header className="border-b border-slate-200 bg-white">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
        <a href="/" className="flex items-center gap-3">
          <img src={logo} alt="OralDent" className="h-12 w-12 rounded-full object-contain" />
          <span className="text-lg font-bold tracking-normal text-[#00478d]">OralDent</span>
        </a>
        <div className="flex items-center gap-2">
          <a href="/reservar?from=portal" className="portal-secondary-button">Reservar cita</a>
          {action}
        </div>
      </nav>
    </header>
  )
}
