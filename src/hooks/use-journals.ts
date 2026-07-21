import { useCallback, useEffect, useState } from 'react'
import { sampleJournals } from '../data/sample-journals'
import { isFirebaseConfigured } from '../services/firebase/config'
import type { MedicalJournal, UploadJournalInput } from '../types/portal'
import { formatFileSize } from '../utils/format-file-size'

interface UseJournalsResult {
  journals: MedicalJournal[]
  isLoading: boolean
  isUploading: boolean
  error: string | null
  isFirebaseEnabled: boolean
  uploadJournal: (input: UploadJournalInput) => Promise<void>
  refreshJournals: () => Promise<void>
}

/**
 * Genera un identificador único para revistas en modo local
 * @returns {string} ID temporal
 */
function createLocalJournalId(): string {
  return `local-${Date.now()}`
}

/**
 * Hook para gestionar revistas con Firestore o fallback local
 * @returns {UseJournalsResult} Estado y acciones del catálogo
 */
export function useJournals(): UseJournalsResult {
  const [journals, setJournals] = useState<MedicalJournal[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const isFirebaseEnabled = isFirebaseConfigured()

  const refreshJournals = useCallback(async () => {
    setError(null)

    if (!isFirebaseEnabled) {
      setJournals(sampleJournals)
      setIsLoading(false)
      return
    }

    setIsLoading(true)

    try {
      const { fetchJournalsFromFirestore } = await import(
        '../services/firebase/journals-service'
      )
      const remoteJournals = await fetchJournalsFromFirestore()
      setJournals(remoteJournals)
    } catch (loadError) {
      const message =
        loadError instanceof Error
          ? loadError.message
          : 'No se pudieron cargar las revistas desde Firestore.'
      setError(message)
      setJournals([])
    } finally {
      setIsLoading(false)
    }
  }, [isFirebaseEnabled])

  useEffect(() => {
    void refreshJournals()
  }, [refreshJournals])

  const uploadJournal = useCallback(
    async (input: UploadJournalInput) => {
      setError(null)
      setIsUploading(true)

      try {
        if (isFirebaseEnabled) {
          const { uploadJournalToFirestore } = await import(
            '../services/firebase/journals-service'
          )
          const uploadedJournal = await uploadJournalToFirestore(input)
          setJournals((current) => [uploadedJournal, ...current])
          return
        }

        const localJournal: MedicalJournal = {
          id: createLocalJournalId(),
          title: input.title,
          authors: input.authors,
          category: input.category,
          issue: input.issue || 'Vol. 1 - Núm. 1 - 2026',
          abstract: input.abstract,
          publishedAt: new Date().toISOString().split('T')[0] ?? '',
          fileName: input.file.name,
          fileSize: formatFileSize(input.file.size),
          fileUrl: URL.createObjectURL(input.file),
        }

        setJournals((current) => [localJournal, ...current])
      } catch (uploadError) {
        const message =
          uploadError instanceof Error
            ? uploadError.message
            : 'No se pudo publicar la revista.'
        setError(message)
        throw uploadError
      } finally {
        setIsUploading(false)
      }
    },
    [isFirebaseEnabled],
  )

  return {
    journals,
    isLoading,
    isUploading,
    error,
    isFirebaseEnabled,
    uploadJournal,
    refreshJournals,
  }
}
