import type { MedicalJournal } from '../types/portal'

export const sampleJournals: MedicalJournal[] = [
  {
    id: 'journal-1',
    title: 'Avances en tratamiento de hipertensión arterial',
    authors: 'Dra. María González, Dr. Carlos Ruiz',
    category: 'ARTÍCULO ORIGINAL',
    issue: 'Vol. 1 - Núm. 1 - 2026',
    abstract:
      'Revisión sistemática de nuevos protocolos farmacológicos y cambios en el manejo clínico de pacientes hipertensos en atención primaria.',
    publishedAt: '2026-03-15',
    fileName: 'hipertension-vol12.pdf',
    fileSize: '2.4 MB',
    fileUrl: '',
    coverImage:
      'https://images.unsplash.com/photo-1628348068343-c6a848d2f1d0?w=800&h=600&fit=crop',
  },
  {
    id: 'journal-2',
    title: 'Biomarcadores tempranos en cáncer de pulmón',
    authors: 'Dr. Alejandro Vega et al.',
    category: 'REVISIÓN SISTEMÁTICA',
    issue: 'Vol. 1 - Núm. 1 - 2026',
    abstract:
      'Estudio prospectivo sobre la utilidad diagnóstica de biomarcadores séricos para detección temprana en poblaciones de alto riesgo.',
    publishedAt: '2026-02-08',
    fileName: 'biomarcadores-pulmon-vol8.pdf',
    fileSize: '3.1 MB',
    fileUrl: '',
    coverImage:
      'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&h=600&fit=crop',
  },
  {
    id: 'journal-3',
    title: 'Impacto de telemedicina en zonas rurales',
    authors: 'Dra. Laura Méndez, Dr. Jorge Salinas',
    category: 'ARTÍCULO ORIGINAL',
    issue: 'Vol. 1 - Núm. 1 - 2026',
    abstract:
      'Análisis del acceso a consultas remotas y su efecto en la continuidad del tratamiento crónico en comunidades alejadas.',
    publishedAt: '2026-01-22',
    fileName: 'telemedicina-rural-vol5.pdf',
    fileSize: '1.8 MB',
    fileUrl: '',
    coverImage:
      'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&h=600&fit=crop',
  },
  {
    id: 'journal-4',
    title: 'Neuroplasticidad post-ictus: revisión clínica',
    authors: 'Dr. Fernando Ortiz',
    category: 'REVISIÓN NARRATIVA',
    issue: 'Vol. 1 - Núm. 2 - 2026',
    abstract:
      'Síntesis de evidencia reciente sobre rehabilitación neurofuncional y resultados a mediano plazo en pacientes post-ictus.',
    publishedAt: '2025-12-10',
    fileName: 'neuroplasticidad-vol15.pdf',
    fileSize: '2.9 MB',
    fileUrl: '',
    coverImage:
      'https://images.unsplash.com/photo-1559757175-57066e9477a0?w=800&h=600&fit=crop',
  },
]
