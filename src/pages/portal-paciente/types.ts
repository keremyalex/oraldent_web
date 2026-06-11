export type PortalTab = 'historial' | 'citas' | 'recetas' | 'radiografias' | 'reportes'

export type PdfAction = (key: string, path: string, filename: string, mode: 'download' | 'open') => void
