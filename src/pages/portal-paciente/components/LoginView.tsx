import type { FormEvent, ReactNode } from 'react'
import { ShieldIcon, ToothIcon, XRayIcon } from '../../../components/icons/ClinicIcons'
import { Field, Notice } from './Shared'

type AccessForm = {
  codigoPaciente: string
  documentoIdentidad: string
}

type LoginViewProps = {
  accessForm: AccessForm
  error: string
  loadingAccess: boolean
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onChange: (form: AccessForm) => void
}

export function LoginView({
  accessForm,
  error,
  loadingAccess,
  onSubmit,
  onChange,
}: LoginViewProps) {
  return (
    <section className="mx-auto grid min-h-[calc(100vh-76px)] max-w-6xl items-center gap-8 px-5 py-8 lg:grid-cols-[1fr_420px]">
      <div>
        <p className="text-sm font-semibold uppercase tracking-wide text-[#006687]">
          Portal del paciente
        </p>
        <h1 className="mt-3 max-w-2xl text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl">
          Consulta tu historial odontológico y descarga tus reportes.
        </h1>
        <p className="mt-4 max-w-xl text-base leading-7 text-slate-600">
          Ingresa con tu código de paciente y documento de identidad para revisar fichas,
          recetas, radiografías y reportes PDF generados por la clínica.
        </p>
        <div className="mt-7 grid max-w-xl gap-3 sm:grid-cols-3">
          <AccessBenefit icon={<ShieldIcon className="h-5 w-5" />} label="Acceso privado" />
          <AccessBenefit icon={<ToothIcon className="h-5 w-5" />} label="Fichas clínicas" />
          <AccessBenefit icon={<XRayIcon className="h-5 w-5" />} label="Radiografías" />
        </div>
      </div>

      <form
        onSubmit={onSubmit}
        className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-blue-950/5 sm:p-6"
      >
        <div>
          <h2 className="text-xl font-bold text-slate-950">Ingresar al portal</h2>
          <p className="mt-1 text-sm leading-6 text-slate-500">
            Usa el código entregado por la clínica y tu CI.
          </p>
        </div>
        {error ? <Notice>{error}</Notice> : null}
        <div className="mt-5 space-y-4">
          <Field label="Código de paciente">
            <input
              value={accessForm.codigoPaciente}
              onChange={(event) => onChange({ ...accessForm, codigoPaciente: event.target.value })}
              required
              autoComplete="off"
              className="portal-input"
              placeholder="Ej. PAC-00012"
            />
          </Field>
          <Field label="Documento de identidad">
            <input
              value={accessForm.documentoIdentidad}
              onChange={(event) => onChange({ ...accessForm, documentoIdentidad: event.target.value })}
              required
              autoComplete="off"
              className="portal-input"
              placeholder="Ej. 8123456"
            />
          </Field>
        </div>
        <button
          type="submit"
          disabled={loadingAccess}
          className="mt-6 w-full rounded-md bg-[#00478d] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#003a74] disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {loadingAccess ? 'Validando...' : 'Ingresar'}
        </button>
      </form>
    </section>
  )
}

function AccessBenefit({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2 rounded-md border border-slate-200 bg-white px-3 py-3 text-sm font-semibold text-slate-700 shadow-sm shadow-blue-950/5">
      <span className="text-[#006687]">{icon}</span>
      {label}
    </div>
  )
}
