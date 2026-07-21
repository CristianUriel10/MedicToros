import { samplePdfUrl } from './visual-theme'
import type { Poster } from '../types/portal'

export const samplePosters: Poster[] = [
  {
    id: 'poster-1',
    title: 'Innovación en diagnóstico cardiovascular',
    category: 'Congreso',
    event: 'Congreso Nacional de Cardiología 2026',
    abstract:
      'Cartel sobre nuevas técnicas de imagenología no invasiva para evaluación de riesgo cardiovascular.',
    publishedAt: '2026-03-10',
    fileName: 'cartel-cardiologia-2026.pdf',
    fileSize: '1.2 MB',
    fileUrl: samplePdfUrl,
  },
  {
    id: 'poster-2',
    title: 'Vacunación y prevención en pediatría',
    category: 'Simposio',
    event: 'Simposio Latinoamericano de Pediatría',
    abstract:
      'Resultados de campañas de inmunización y su impacto en morbilidad infantil en zonas urbanas.',
    publishedAt: '2026-02-18',
    fileName: 'cartel-pediatria-vacunas.pdf',
    fileSize: '980 KB',
    fileUrl: samplePdfUrl,
  },
  {
    id: 'poster-3',
    title: 'IA aplicada a detección temprana de cáncer',
    category: 'Jornada',
    event: 'Jornada de Oncología Molecular',
    abstract:
      'Modelos de aprendizaje automático para identificación de patrones en estudios de imagen oncológica.',
    publishedAt: '2026-01-30',
    fileName: 'cartel-oncologia-ia.pdf',
    fileSize: '1.5 MB',
    fileUrl: samplePdfUrl,
  },
]
