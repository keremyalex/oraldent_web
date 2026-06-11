import type { FichaClinica } from '../../../types/api'
import type { PdfAction } from '../types'
import { EmptyState } from './Shared'

type ReportesTabProps = {
  ficha: FichaClinica
  downloadingKey: string
  onPdf: PdfAction
}

export function ReportesTab({ ficha, downloadingKey, onPdf }: ReportesTabProps) {
  const reports = [
    ficha.odontogramaId
      ? {
          key: `odontograma-${ficha.odontogramaId}`,
          title: 'Odontograma',
          detail: 'Reporte visual del odontograma de la ficha.',
          path: `/odontogramas/${ficha.odontogramaId}/pdf`,
          filename: `odontograma-${ficha.odontogramaId}.pdf`,
        }
      : null,
    ficha.periodontogramaId
      ? {
          key: `periodontograma-${ficha.periodontogramaId}`,
          title: 'Periodontograma',
          detail: 'Reporte visual periodontal con tablas y gráfico.',
          path: `/periodontogramas/${ficha.periodontogramaId}/pdf`,
          filename: `periodontograma-${ficha.periodontogramaId}.pdf`,
        }
      : null,
  ].filter(Boolean) as Array<{ key: string; title: string; detail: string; path: string; filename: string }>

  if (reports.length === 0) return <EmptyState title="No hay reportes PDF para esta ficha" />

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {reports.map((report) => (
        <article key={report.key} className="rounded-lg border border-slate-200 p-4">
          <h3 className="font-bold text-slate-950">{report.title}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{report.detail}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onPdf(`${report.key}-open`, report.path, report.filename, 'open')}
              disabled={downloadingKey === `${report.key}-open`}
              className="portal-secondary-button"
            >
              {downloadingKey === `${report.key}-open` ? 'Abriendo...' : 'Ver/Imprimir'}
            </button>
            <button
              type="button"
              onClick={() => onPdf(report.key, report.path, report.filename, 'download')}
              disabled={downloadingKey === report.key}
              className="portal-primary-button"
            >
              {downloadingKey === report.key ? 'Descargando...' : 'Descargar'}
            </button>
          </div>
        </article>
      ))}
    </div>
  )
}
