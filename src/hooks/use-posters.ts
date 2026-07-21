import { useCallback, useEffect, useState } from 'react'
import { samplePosters } from '../data/sample-posters'
import { isFirebaseConfigured } from '../services/firebase/config'
import type { Poster } from '../types/portal'

interface UsePostersResult {
  posters: Poster[]
  isLoading: boolean
  error: string | null
  refreshPosters: () => Promise<void>
}

/**
 * Hook para gestionar carteles con Firestore o fallback local
 * @returns {UsePostersResult} Estado del catálogo de carteles
 */
export function usePosters(): UsePostersResult {
  const [posters, setPosters] = useState<Poster[]>([])
  const [isLoading, setIsLoading] = useState(true)
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
      setPosters(remotePosters.length > 0 ? remotePosters : samplePosters)
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : 'No se pudieron cargar los carteles desde Firestore.'
      setError(message)
      setPosters(samplePosters)
    } finally {
      setIsLoading(false)
    }
  }, [isFirebaseEnabled])

  useEffect(() => {
    void refreshPosters()
  }, [refreshPosters])

  return {
    posters,
    isLoading,
    error,
    refreshPosters,
  }
}
