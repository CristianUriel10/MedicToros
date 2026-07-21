import { useCallback, useEffect, useState } from 'react'
import { samplePosters } from '../data/sample-posters'
import { isFirebaseConfigured } from '../services/firebase/config'
import type { Poster, UploadPosterInput } from '../types/portal'
import { formatFileSize } from '../utils/format-file-size'

interface UsePostersResult {
  posters: Poster[]
  isLoading: boolean
  isUploading: boolean
  isDeleting: boolean
  error: string | null
  uploadPoster: (input: UploadPosterInput) => Promise<void>
  deletePoster: (posterId: string) => Promise<void>
  refreshPosters: () => Promise<void>
}

/**
 * Genera un identificador único para carteles en modo local
 * @returns {string} ID temporal
 */
function createLocalPosterId(): string {
  return `local-poster-${Date.now()}`
}

/**
 * Hook para gestionar carteles con Firestore o fallback local
 * @returns {UsePostersResult} Estado del catálogo de carteles
 */
export function usePosters(): UsePostersResult {
  const [posters, setPosters] = useState<Poster[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isFirebaseEnabled = isFirebaseConfigured()

  const refreshPosters = useCallback(async () => {
    setError(null)

    if (!isFirebaseEnabled) {
      setPosters(samplePosters)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    try {
      const { fetchPostersFromFirestore } = await import(
        '../services/firebase/posters-service'
      )
      const remotePosters = await fetchPostersFromFirestore()
      setPosters(remotePosters)
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : 'No se pudieron cargar los carteles desde Firestore.'
      setError(message)
      setPosters([])
    } finally {
      setIsLoading(false)
    }
  }, [isFirebaseEnabled])

  useEffect(() => {
    void refreshPosters()
  }, [refreshPosters])

  const uploadPoster = useCallback(
    async (input: UploadPosterInput) => {
      setError(null)
      setIsUploading(true)

      try {
        if (isFirebaseEnabled) {
          const { uploadPosterToFirestore } = await import(
            '../services/firebase/posters-service'
          )
          const uploadedPoster = await uploadPosterToFirestore(input)
          setPosters((current) => [uploadedPoster, ...current])
          return
        }

        const localPoster: Poster = {
          id: createLocalPosterId(),
          title: input.title,
          category: input.category,
          event: input.event || 'Sin evento',
          abstract: input.abstract,
          publishedAt: new Date().toISOString().split('T')[0] ?? '',
          fileName: input.file.name,
          fileSize: formatFileSize(input.file.size),
          fileUrl: URL.createObjectURL(input.file),
        }

        setPosters((current) => [localPoster, ...current])
      } catch (uploadError) {
        const message =
          uploadError instanceof Error
            ? uploadError.message
            : 'No se pudo publicar el cartel.'
        setError(message)
        throw uploadError
      } finally {
        setIsUploading(false)
      }
    },
    [isFirebaseEnabled],
  )

  const deletePoster = useCallback(
    async (posterId: string) => {
      setError(null)
      setIsDeleting(true)

      try {
        if (isFirebaseEnabled) {
          const { deletePosterFromFirestore } = await import(
            '../services/firebase/posters-service'
          )
          await deletePosterFromFirestore(posterId)
        }

        setPosters((current) => current.filter((poster) => poster.id !== posterId))
      } catch (deleteError) {
        const message =
          deleteError instanceof Error
            ? deleteError.message
            : 'No se pudo eliminar el cartel.'
        setError(message)
        throw deleteError
      } finally {
        setIsDeleting(false)
      }
    },
    [isFirebaseEnabled],
  )

  return {
    posters,
    isLoading,
    isUploading,
    isDeleting,
    error,
    uploadPoster,
    deletePoster,
    refreshPosters,
  }
}
