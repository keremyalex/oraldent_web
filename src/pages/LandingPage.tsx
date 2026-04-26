import logo from '../assets/logo.png'
import consultorioExterior from '../assets/consultorio1.jpg'
import consultorioInterior from '../assets/consultorio2.jpg'
import radiografia from '../assets/radiografia.jpg'
import { contactItems, landingServices } from '../data/landing'
import {
  ArrowRightIcon,
  CheckIcon,
  ShieldIcon,
} from '../components/icons/ClinicIcons'

function LandingPage() {
  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#162033]">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="#inicio" className="flex items-center gap-3">
            <img
              src={logo}
              alt="OralDent"
              className="h-12 w-12 rounded-full object-contain"
            />
            <span className="text-lg font-bold tracking-normal text-[#00478d]">
              OralDent
            </span>
          </a>

          <div className="hidden items-center gap-8 text-sm font-medium text-slate-700 md:flex">
            <a className="transition hover:text-[#00478d]" href="#servicios">
              Servicios
            </a>
            <a className="transition hover:text-[#00478d]" href="#clinica">
              Clínica
            </a>
            <a className="transition hover:text-[#00478d]" href="#contacto">
              Contacto
            </a>
          </div>

          <a
            href="/reservar"
            className="rounded-md bg-[#00478d] px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-[#003a73] focus:outline-none focus:ring-2 focus:ring-[#73d1ff] focus:ring-offset-2"
          >
            Reservar cita
          </a>
        </nav>
      </header>

      <section id="inicio" className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1fr_0.92fr] lg:py-16">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-[#00478d]">
              <ShieldIcon className="h-4 w-4" />
              Centro odontológico en Warnes
            </p>
            <h1 className="mt-6 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-5xl lg:text-6xl">
              Tu sonrisa en manos cercanas y profesionales
            </h1>
            <p className="mt-5 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
              En OralDent cuidamos tu salud dental con atención integral,
              diagnóstico por imagen y tratamientos para devolver confianza a
              tu sonrisa.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="/reservar"
                className="inline-flex items-center justify-center gap-2 rounded-md bg-[#00478d] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-[#003a73] focus:outline-none focus:ring-2 focus:ring-[#73d1ff] focus:ring-offset-2"
              >
                Reservar cita
                <ArrowRightIcon className="h-4 w-4" />
              </a>
              <a
                href="#servicios"
                className="inline-flex items-center justify-center rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-[#00478d] transition hover:border-[#00478d] hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-[#73d1ff] focus:ring-offset-2"
              >
                Ver servicios
              </a>
            </div>

            <div className="mt-10 grid max-w-xl grid-cols-3 gap-4 border-t border-slate-200 pt-6">
              <Stat value="5" label="Servicios clave" />
              <Stat value="24h" label="Emergencias" />
              <Stat value="Warnes" label="Atención local" />
            </div>
          </div>

          <div className="relative min-h-[420px] overflow-hidden rounded-lg bg-slate-900 shadow-2xl shadow-blue-950/20">
            <img
              src={consultorioExterior}
              alt="Fachada de la clínica OralDent en Warnes"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-slate-950/15 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <p className="text-sm font-semibold text-blue-100">
                Av. 25 de Mayo
              </p>
              <p className="mt-2 max-w-sm text-2xl font-bold leading-snug">
                Atención odontológica integral cerca de ti
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="servicios" className="bg-[#f7f9fc] py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-wide text-[#006687]">
              Especialidades clínicas
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Tratamientos para cuidar, recuperar y mejorar tu sonrisa
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Servicios enfocados en diagnóstico, estética, rehabilitación y
              seguimiento odontológico.
            </p>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {landingServices.map((service) => {
              const Icon = service.icon
              return (
                <article
                  key={service.name}
                  className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm shadow-blue-950/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-950/10"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-md bg-blue-50 text-[#00478d]">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mt-5 text-xl font-bold tracking-normal text-slate-950">
                    {service.name}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {service.description}
                  </p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section id="clinica" className="border-y border-slate-200 bg-white py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.95fr_1fr] lg:items-center">
          <div className="grid grid-cols-[0.75fr_1fr] gap-4">
            <img
              src={radiografia}
              alt="Radiografía dental para diagnóstico"
              className="h-full min-h-72 rounded-lg object-cover shadow-lg shadow-blue-950/10"
            />
            <img
              src={consultorioInterior}
              alt="Consultorio odontológico OralDent"
              className="h-full min-h-72 rounded-lg object-cover shadow-lg shadow-blue-950/10"
            />
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#006687]">
              Clínica OralDent
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Un espacio preparado para atenderte con calma y precisión
            </h2>
            <p className="mt-4 text-base leading-7 text-slate-600">
              Combinamos experiencia, diagnóstico y trato humano para que cada
              visita tenga una ruta clara: escuchar, evaluar y proponer el
              tratamiento adecuado.
            </p>

            <div className="mt-7 space-y-4">
              <CheckItem text="Atención para implantología, ortodoncia, prótesis y estética dental." />
              <CheckItem text="Apoyo diagnóstico con rayo X para decisiones clínicas mejor informadas." />
              <CheckItem text="Reserva de citas sin crear cuenta, pensada para pacientes nuevos y recurrentes." />
            </div>
          </div>
        </div>
      </section>

      <section id="contacto" className="bg-[#eef5fb] py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-[#006687]">
              Información de contacto
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-normal text-slate-950 sm:text-4xl">
              Agenda tu valoración o consulta tus dudas
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-slate-600">
              Estamos ubicados en Av. 25 de Mayo, Tte. Dionisio Manjón y Viru
              Viru, Warnes, Bolivia.
            </p>
          </div>

          <div className="grid gap-3">
            {contactItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 text-left shadow-sm shadow-blue-950/5 transition hover:border-[#00478d]"
              >
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {item.label}
                  </span>
                  <span className="mt-1 block break-all text-base font-semibold text-slate-950">
                    {item.value}
                  </span>
                </span>
                <ArrowRightIcon className="h-5 w-5 shrink-0 text-[#00478d]" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <footer className="bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-8 text-sm text-slate-600 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <img src={logo} alt="" className="h-10 w-10 rounded-full object-contain" />
            <span className="font-semibold text-slate-950">OralDent Bolivia</span>
          </div>
          <p>© 2026 Centro Odontológico OralDent. Warnes, Bolivia.</p>
        </div>
      </footer>
    </main>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-xl font-bold text-[#00478d]">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  )
}

function CheckItem({ text }: { text: string }) {
  return (
    <div className="flex gap-3">
      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#00478d] text-white">
        <CheckIcon className="h-4 w-4" />
      </span>
      <p className="text-sm leading-6 text-slate-700">{text}</p>
    </div>
  )
}

export default LandingPage
