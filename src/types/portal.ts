export interface NavLink {
  label: string
  href: string
}

export interface EditorialMember {
  id: string
  name: string
  role: string
  photoUrl: string
}

export interface SubmissionFeature {
  id: string
  label: string
  icon: 'review' | 'ethics' | 'scope' | 'access'
}

export interface FooterColumn {
  title: string
  links: NavLink[]
}

export interface MedicalJournal {
  id: string
  title: string
  authors: string
  category: string
  issue: string
  abstract: string
  publishedAt: string
  fileName: string
  fileSize: string
  fileUrl: string
  coverImage?: string
}

export interface JournalDocument {
  title: string
  authors: string
  category: string
  issue: string
  abstract: string
  publishedAt: string
  fileName: string
  fileSize: string
  fileUrl: string
  storagePath: string
  coverImage?: string
}

export interface UploadJournalInput {
  title: string
  authors: string
  category: string
  issue: string
  abstract: string
  file: File
}

export const journalCategories = [
  'Medicina General',
  'Cardiología',
  'Neurología',
  'Oncología',
  'Pediatría',
  'Investigación Clínica',
  'Salud Pública',
] as const

export type JournalCategory = (typeof journalCategories)[number]
