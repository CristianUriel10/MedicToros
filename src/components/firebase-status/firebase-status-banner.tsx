import { getFirebaseConfig } from '../../services/firebase/config'
import { isSupabaseStorageConfigured } from '../../services/supabase/config'
import { isUsingFirebaseEmulators } from '../../services/firebase/firebase-client'

interface FirebaseStatusBannerProps {
  isFirebaseEnabled: boolean
  error: string | null
}

/**
 * Banner discreto del estado de Firebase
 * @param props - Estado de conexión
 * @returns {JSX.Element | null} Aviso de estado
 */
export function FirebaseStatusBanner({
  isFirebaseEnabled,
  error,
}: FirebaseStatusBannerProps) {
  if (error) {
    return (
      <div
        className="bg-accent-700 px-4 py-2 text-center text-xs text-white"
        role="alert"
      >
        Error Firebase: {error}
      </div>
    )
  }

  if (isFirebaseEnabled) {
    const projectId = getFirebaseConfig().projectId
    const storageLabel = isSupabaseStorageConfigured()
      ? ' — PDFs en Supabase (gratis)'
      : isUsingFirebaseEmulators()
        ? ' — emuladores locales'
        : ' — PDFs vía servidor Firebase'

    return (
      <div className="bg-green-900/80 px-4 py-2 text-center text-xs text-green-200">
        Conectado a Firebase ({projectId}){storageLabel}
      </div>
    )
  }

  return (
    <div className="bg-amber-900/60 px-4 py-2 text-center text-xs text-amber-100">
      Modo demo — configura <code className="rounded bg-black/20 px-1">.env</code> para
      guardar en Firestore y Storage
    </div>
  )
}
