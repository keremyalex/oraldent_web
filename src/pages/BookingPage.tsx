import { useEffect, useMemo, useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import logo from '../assets/logo.png'
import { ArrowRightIcon } from '../components/icons/ClinicIcons'
import { crearCita, getDisponibilidad, getServicios } from '../services/bookingService'
import type { Cita, PacienteForm, Servicio } from '../types/api'

const initialPatientForm: PacienteForm = {
  nombre: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
  celular: '',
  documentoIdentidad: '',
  correo: '',
  fechaNacimiento: '',
  direccion: '',
  motivo: '',
}

function BookingPage() {
  const [apiServices, setApiServices] = useState<Servicio[]>([])
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(null)
  const [selectedDate, setSelectedDate] = useState(getTodayDate())
  const [selectedTime, setSelectedTime] = useState('')
  const [availableTimes, setAvailableTimes] = useState<string[]>([])
  const [patient, setPatient] = useState<PacienteForm>(initialPatientForm)
  const [loadingServices, setLoadingServices] = useState(true)
  const [loadingTimes, setLoadingTimes] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiNotice, setApiNotice] = useState('')
  const [availabilityNotice, setAvailabilityNotice] = useState('')
  const [error, setError] = useState('')
  const [createdAppointment, setCreatedAppointment] = useState<Cita | null>(null)

  const selectedService = useMemo(
    () => apiServices.find((service) => service.id === selectedServiceId),
    [selectedServiceId, apiServices],
  )
  const patientFullName = getPatientFullName(patient)

  useEffect(() => {
    async function loadServices() {
      setLoadingServices(true)
      try {
        const data = await getServicios()
        setApiServices(data.filter((service) => service.activo !== false))
        setApiNotice('')
      } catch {
        setApiServices([])
        setApiNotice('No se pudo conectar con la API para cargar los servicios.')
      } finally {
        setLoadingServices(false)
      }
    }

    void loadServices()
  }, [])

  useEffect(() => {
    async function loadAvailability() {
      if (!selectedDate) {
        setAvailableTimes([])
        return
      }

      setLoadingTimes(true)
      setSelectedTime('')
      try {
        const data = await getDisponibilidad(selectedDate)
        const times = data.horariosDisponibles.map((time) => time.slice(0, 5))

        if (times.length > 0) {
          setAvailableTimes(times)
          return
        }

        const nextAvailability = await findNextAvailableDate(selectedDate)
        if (nextAvailability) {
          setSelectedDate(nextAvailability.date)
          setAvailableTimes(nextAvailability.times)
          setAvailabilityNotice(
            `No quedan horarios para la fecha seleccionada. Mostrando disponibilidad del ${formatDisplayDate(nextAvailability.date)}.`,
          )
          return
        }

        setAvailableTimes([])
        setAvailabilityNotice('No encontramos horarios disponibles en los próximos días.')
      } catch {
        setAvailableTimes([])
        setAvailabilityNotice('No se pudo consultar la disponibilidad real de la API.')
      } finally {
        setLoadingTimes(false)
      }
    }

    void loadAvailability()
  }, [selectedDate])

  function updatePatient<K extends keyof PacienteForm>(field: K, value: PacienteForm[K]) {
    setPatient((current) => ({ ...current, [field]: value }))
  }

  function changeSelectedDate(value: string) {
    setAvailabilityNotice('')
    setSelectedDate(value)
  }

  async function submitAppointment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setCreatedAppointment(null)

    if (!selectedServiceId || !selectedDate || !selectedTime) {
      setError('Selecciona servicio, fecha y horario para continuar.')
      return
    }

    setSubmitting(true)
    try {
      const created = await crearCita({
        paciente: {
          nombre: patient.nombre.trim(),
          apellidoPaterno: patient.apellidoPaterno.trim(),
          apellidoMaterno: patient.apellidoMaterno.trim() || null,
          celular: patient.celular.trim(),
          documentoIdentidad: patient.documentoIdentidad.trim() || null,
          correo: patient.correo.trim() || null,
          fechaNacimiento: patient.fechaNacimiento || null,
          direccion: patient.direccion.trim() || null,
          fotoUrl: null,
        },
        servicioId: selectedServiceId,
        fechaHoraInicio: `${selectedDate}T${selectedTime}:00`,
        motivo: patient.motivo.trim(),
        notas: null,
      })
      setCreatedAppointment(created)
      setPatient(initialPatientForm)
      setSelectedTime('')
    } catch (appointmentError) {
      setError(
        appointmentError instanceof Error
          ? appointmentError.message
          : 'No se pudo registrar la cita.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f7f9fc] text-[#162033]">
      <header className="border-b border-slate-200 bg-white">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 sm:px-8">
          <a href="/" className="flex items-center gap-3">
            <img src={logo} alt="OralDent" className="h-12 w-12 rounded-full object-contain" />
            <span className="text-lg font-bold tracking-normal text-[#00478d]">
              OralDent
            </span>
          </a>
          <a
            href="/"
            className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-[#00478d] transition hover:border-[#00478d] hover:bg-blue-50"
          >
            Volver
          </a>
        </nav>
      </header>

      <section className="mx-auto max-w-[86rem] px-5 py-7 sm:px-8 sm:py-9">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-[#006687]">
            Reserva
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-tight tracking-normal text-slate-950 sm:text-[2.75rem]">
            Agenda tu cita odontológica
          </h1>
          <p className="mt-3 text-base leading-7 text-slate-600">
            Elige servicio, horario disponible y registra tus datos. La cita se
            guarda directamente en el sistema.
          </p>
        </div>

        <div className="mx-auto mt-7 grid max-w-[86rem] gap-6 lg:grid-cols-[1fr_355px]">
          <form
            id="booking-form"
            onSubmit={submitAppointment}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-blue-950/5 sm:p-6"
          >
            {apiNotice ? (
              <div className="mb-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
                {apiNotice}
              </div>
            ) : null}
            {availabilityNotice ? (
              <div className="mb-5 rounded-md border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
                {availabilityNotice}
              </div>
            ) : null}

            <BookingSection number="1" title="Selecciona el servicio">
              {loadingServices ? (
                <p className="text-sm text-slate-500">Cargando servicios...</p>
              ) : (
                <div className="grid gap-3 md:grid-cols-2">
                  {apiServices.map((service) => (
                    <button
                      key={service.id}
                      type="button"
                      onClick={() => setSelectedServiceId(service.id)}
                      className={`rounded-md border p-4 text-left transition ${
                        selectedServiceId === service.id
                          ? 'border-[#00478d] bg-blue-50 ring-2 ring-blue-100'
                          : 'border-slate-200 bg-white hover:border-[#00478d]'
                      }`}
                    >
                      <span className="block text-[15px] font-bold text-slate-950">
                        {service.nombre}
                      </span>
                      <span className="mt-1.5 block text-[13px] leading-5 text-slate-600">
                        {service.descripcion}
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </BookingSection>

            <BookingSection number="2" title="Elige fecha y hora">
              <div className="grid gap-5 md:grid-cols-[235px_1fr]">
                <label className="block">
                  <span className="mb-2 block text-[13px] font-semibold uppercase tracking-wide text-slate-600">
                    Fecha
                  </span>
                  <input
                    type="date"
                    min={getTodayDate()}
                    value={selectedDate}
                    onChange={(event) => changeSelectedDate(event.target.value)}
                    className="h-11 w-full rounded-md border border-slate-300 px-3.5 text-[15px] outline-none transition focus:border-[#00478d] focus:ring-2 focus:ring-blue-100"
                    required
                  />
                </label>

                <div>
                  <span className="mb-2 block text-[13px] font-semibold uppercase tracking-wide text-slate-600">
                    Horas de inicio disponibles
                  </span>
                  {loadingTimes ? (
                    <p className="rounded-md border border-slate-200 px-4 py-3 text-sm text-slate-500">
                      Consultando disponibilidad...
                    </p>
                  ) : availableTimes.length === 0 ? (
                    <p className="rounded-md border border-slate-200 px-4 py-3 text-sm text-slate-500">
                      No hay horarios disponibles para esta fecha.
                    </p>
                  ) : (
                    <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
                      {availableTimes.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`h-10 rounded-md border text-[15px] font-semibold transition ${
                            selectedTime === time
                              ? 'border-[#00478d] bg-[#00478d] text-white'
                              : 'border-slate-300 bg-white text-slate-700 hover:border-[#00478d] hover:text-[#00478d]'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </BookingSection>

            <BookingSection number="3" title="Datos del paciente">
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <TextInput label="Nombre" value={patient.nombre} onChange={(value) => updatePatient('nombre', value)} required />
                <TextInput label="Apellido paterno" value={patient.apellidoPaterno} onChange={(value) => updatePatient('apellidoPaterno', value)} required />
                <TextInput label="Apellido materno" value={patient.apellidoMaterno} onChange={(value) => updatePatient('apellidoMaterno', value)} />
                <TextInput label="Celular" value={patient.celular} onChange={(value) => updatePatient('celular', value)} required />
                <TextInput label="Documento de identidad" value={patient.documentoIdentidad} onChange={(value) => updatePatient('documentoIdentidad', value)} />
                <TextInput label="Correo" type="email" value={patient.correo} onChange={(value) => updatePatient('correo', value)} />
                <TextInput label="Fecha de nacimiento" type="date" value={patient.fechaNacimiento} onChange={(value) => updatePatient('fechaNacimiento', value)} />
                <TextInput label="Dirección" value={patient.direccion} onChange={(value) => updatePatient('direccion', value)} />
              </div>

              <div className="mt-4">
                <TextArea label="Motivo de consulta" value={patient.motivo} onChange={(value) => updatePatient('motivo', value)} required />
              </div>
            </BookingSection>
          </form>

          <aside className="h-fit rounded-lg border border-slate-200 bg-white p-5 shadow-sm shadow-blue-950/5 lg:sticky lg:top-6">
            <p className="text-[15px] font-semibold uppercase tracking-wide text-[#006687]">
              Resumen
            </p>
            <div className="mt-5 space-y-4">
              <SummaryItem label="Servicio" value={selectedService?.nombre ?? 'Sin seleccionar'} />
              <SummaryItem label="Fecha" value={formatDisplayDate(selectedDate)} />
              <SummaryItem label="Hora de inicio" value={selectedTime || 'Sin seleccionar'} />
              <SummaryItem label="Paciente" value={patientFullName || 'Pendiente'} />
            </div>

            <button
              type="submit"
              form="booking-form"
              disabled={submitting}
              className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-md bg-[#00478d] px-5 py-3 text-[15px] font-semibold text-white shadow-lg shadow-blue-900/15 transition hover:bg-[#003a73] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? 'Registrando...' : 'Confirmar cita'}
              <ArrowRightIcon className="h-4 w-4" />
            </button>

            {error ? (
              <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
                {error}
              </div>
            ) : null}

            {createdAppointment ? (
              <div className="mt-4 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
                Cita registrada. Código de gestión:{' '}
                <strong>{createdAppointment.codigoGestion}</strong>.
              </div>
            ) : null}
          </aside>
        </div>
      </section>
    </main>
  )
}

function BookingSection({
  number,
  title,
  children,
}: {
  number: string
  title: string
  children: ReactNode
}) {
  return (
    <section className="border-b border-slate-200 py-5 first:pt-0 last:border-b-0">
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00478d] text-sm font-bold text-white">
          {number}
        </span>
        <h2 className="text-lg font-bold tracking-normal text-slate-950">{title}</h2>
      </div>
      {children}
    </section>
  )
}

function TextInput({
  label,
  type = 'text',
  value,
  onChange,
  required = false,
}: {
  label: string
  type?: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold uppercase tracking-wide text-slate-600">{label}</span>
      <input
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        className="h-11 w-full rounded-md border border-slate-300 px-3.5 text-[15px] outline-none transition focus:border-[#00478d] focus:ring-2 focus:ring-blue-100"
      />
    </label>
  )
}

function TextArea({
  label,
  value,
  onChange,
  required = false,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold uppercase tracking-wide text-slate-600">{label}</span>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        required={required}
        rows={3}
        className="w-full resize-none rounded-md border border-slate-300 px-3.5 py-2.5 text-[15px] outline-none transition focus:border-[#00478d] focus:ring-2 focus:ring-blue-100"
      />
    </label>
  )
}

function SummaryItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b border-slate-100 pb-3 last:border-b-0 last:pb-0">
      <p className="text-[13px] font-semibold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-1.5 text-[15px] font-semibold text-slate-950">{value}</p>
    </div>
  )
}

function getPatientFullName(patient: PacienteForm) {
  return [
    patient.nombre.trim(),
    patient.apellidoPaterno.trim(),
    patient.apellidoMaterno.trim(),
  ]
    .filter(Boolean)
    .join(' ')
}

function getTodayDate() {
  return formatDateInputValue(new Date())
}

async function findNextAvailableDate(fromDate: string) {
  const date = parseDateInputValue(fromDate)

  for (let offset = 1; offset <= 30; offset += 1) {
    date.setDate(date.getDate() + 1)
    const candidateDate = formatDateInputValue(date)
    const data = await getDisponibilidad(candidateDate)
    const times = data.horariosDisponibles.map((time) => time.slice(0, 5))

    if (times.length > 0) {
      return { date: candidateDate, times }
    }
  }

  return null
}

function parseDateInputValue(value: string) {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function formatDateInputValue(date: Date) {
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function formatDisplayDate(value: string) {
  if (!value) {
    return 'Sin seleccionar'
  }

  const [year, month, day] = value.split('-')
  return `${day}/${month}/${year}`
}

export default BookingPage
