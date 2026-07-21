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
    return (
      <div className="bg-green-900/80 px-4 py-2 text-center text-xs text-green-200">
        Conectado a Firebase — artículos y PDF persistentes en la nube
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
