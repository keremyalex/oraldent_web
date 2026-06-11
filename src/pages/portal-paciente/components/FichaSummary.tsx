import type { FichaClinica } from '../../../types/api'
import { boolText } from '../utils'
import { InfoGrid, SectionCard, TextBlock } from './Shared'

export function FichaSummary({ ficha }: { ficha: FichaClinica }) {
  return (
    <div className="grid gap-4 xl:grid-cols-2">
      <SectionCard title="Datos generales">
        <InfoGrid
          items={[
            ['Edad', ficha.edad ? `${ficha.edad} años` : null],
            ['Sexo', ficha.sexo],
            ['Procedencia', ficha.procedencia],
            ['Ocupación', ficha.ocupacion],
            ['Presión arterial', ficha.presionArterial],
            ['Temperatura', ficha.temperatura ? `${ficha.temperatura} °C` : null],
            ['Pulso', ficha.pulso ? `${ficha.pulso} lpm` : null],
          ]}
        />
      </SectionCard>
      <SectionCard title="Consulta">
        <TextBlock label="Motivo" value={ficha.motivoConsulta} />
        <TextBlock label="Enfermedad actual" value={ficha.enfermedadActual} />
        <TextBlock label="Diagnóstico" value={ficha.diagnostico} />
      </SectionCard>
      <SectionCard title="Anamnesis">
        <InfoGrid
          items={[
            ['Hemorragia', boolText(ficha.anamnesis?.hemorragia)],
            ['Diabetes', boolText(ficha.anamnesis?.diabetes)],
            ['Hipertensión', boolText(ficha.anamnesis?.hipertension)],
            ['Epilepsia', boolText(ficha.anamnesis?.epilepsia)],
            ['Alergias', ficha.anamnesis?.alergias],
            ['Medicación actual', ficha.anamnesis?.medicacionActual],
          ]}
        />
      </SectionCard>
      <SectionCard title="Tratamiento y evolución">
        <TextBlock label="Tratamiento" value={ficha.tratamiento} />
        <TextBlock label="Evolución" value={ficha.evolucion} />
      </SectionCard>
    </div>
  )
}
