/**
 * Traduce errores comunes de subida a Storage en mensajes accionables
 * @param error - Error capturado al subir PDF
 * @returns {string} Mensaje para mostrar al usuario
 */
export function formatStorageUploadError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error)
  const normalized = message.toLowerCase()

  if (
    normalized.includes('row-level security') ||
    normalized.includes('row level security') ||
    normalized.includes('violates row-level security')
  ) {
    return (
      'Faltan permisos en Supabase Storage. En supabase.com abre SQL Editor, ' +
      'ejecuta el archivo supabase/storage-policies.sql y vuelve a intentar.'
    )
  }

  if (
    normalized.includes('cors') ||
    normalized.includes('failed to fetch') ||
    normalized.includes('network')
  ) {
    return (
      'Error de CORS en Firebase Storage. En local usa: npm run dev:local. ' +
      'En producción aplica firebase/storage.cors.json en Google Cloud Shell.'
    )
  }

  return message || 'No se pudo subir el archivo PDF.'
}
