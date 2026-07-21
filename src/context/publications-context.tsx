import { createContext, useContext, type ReactNode } from 'react'
import { useJournals } from '../hooks/use-journals'
import { usePosters } from '../hooks/use-posters'
import type { MedicalJournal, Poster } from '../types/portal'

interface PublicationsContextValue {
  articles: MedicalJournal[]
  posters: Poster[]
  isLoadingArticles: boolean
  isLoadingPosters: boolean
  isUploading: boolean
  error: string | null
  isFirebaseEnabled: boolean
  uploadArticle: ReturnType<typeof useJournals>['uploadJournal']
  findArticle: (id: string) => MedicalJournal | undefined
  findPoster: (id: string) => Poster | undefined
}

const PublicationsContext = createContext<PublicationsContextValue | null>(null)

/**
 * Proveedor global de artículos y carteles para la app
 * @param props - Componentes hijos
 * @returns {JSX.Element} Provider de publicaciones
 */
export function PublicationsProvider({ children }: { children: ReactNode }) {
  const {
    journals,
    isLoading,
    isUploading,
    error,
    isFirebaseEnabled,
    uploadJournal,
  } = useJournals()
  const {
    posters,
    isLoading: isLoadingPosters,
    error: postersError,
  } = usePosters()

  const value: PublicationsContextValue = {
    articles: journals,
    posters,
    isLoadingArticles: isLoading,
    isLoadingPosters,
    isUploading,
    error: error ?? postersError,
    isFirebaseEnabled,
    uploadArticle: uploadJournal,
    findArticle: (id) => journals.find((article) => article.id === id),
    findPoster: (id) => posters.find((poster) => poster.id === id),
  }

  return (
    <PublicationsContext.Provider value={value}>{children}</PublicationsContext.Provider>
  )
}

/**
 * Hook para acceder al catálogo compartido de publicaciones
 * @returns {PublicationsContextValue} Artículos, carteles y acciones
 */
export function usePublications(): PublicationsContextValue {
  const context = useContext(PublicationsContext)

  if (!context) {
    throw new Error('usePublications debe usarse dentro de PublicationsProvider')
  }

  return context
}
