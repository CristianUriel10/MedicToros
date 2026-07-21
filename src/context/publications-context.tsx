import { createContext, useContext, type ReactNode } from 'react'
import { useJournals } from '../hooks/use-journals'
import { usePosters } from '../hooks/use-posters'
import { useUploadAccess } from '../hooks/use-upload-access'
import type { MedicalJournal, Poster } from '../types/portal'

interface PublicationsContextValue {
  articles: MedicalJournal[]
  posters: Poster[]
  isLoadingArticles: boolean
  isLoadingPosters: boolean
  isUploading: boolean
  isDeleting: boolean
  error: string | null
  isFirebaseEnabled: boolean
  isUploadPasswordRequired: boolean
  isUploadUnlocked: boolean
  unlockUpload: (password: string) => boolean
  lockUpload: () => void
  uploadArticle: ReturnType<typeof useJournals>['uploadJournal']
  uploadPoster: ReturnType<typeof usePosters>['uploadPoster']
  deleteArticle: ReturnType<typeof useJournals>['deleteJournal']
  deletePoster: ReturnType<typeof usePosters>['deletePoster']
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
    isUploading: isUploadingArticle,
    isDeleting: isDeletingArticle,
    error,
    isFirebaseEnabled,
    uploadJournal,
    deleteJournal,
  } = useJournals()
  const {
    posters,
    isLoading: isLoadingPosters,
    isUploading: isUploadingPoster,
    isDeleting: isDeletingPoster,
    error: postersError,
    uploadPoster,
    deletePoster,
  } = usePosters()
  const {
    isUploadPasswordRequired,
    isUploadUnlocked,
    unlockUpload,
    lockUpload,
  } = useUploadAccess()

  const value: PublicationsContextValue = {
    articles: journals,
    posters,
    isLoadingArticles: isLoading,
    isLoadingPosters,
    isUploading: isUploadingArticle || isUploadingPoster,
    isDeleting: isDeletingArticle || isDeletingPoster,
    error: error ?? postersError,
    isFirebaseEnabled,
    isUploadPasswordRequired,
    isUploadUnlocked,
    unlockUpload,
    lockUpload,
    uploadArticle: uploadJournal,
    uploadPoster,
    deleteArticle: deleteJournal,
    deletePoster,
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
