import { hasUploadAccessInSession } from '../../utils/upload-access'
import { fileToBase64 } from '../../utils/file-to-base64'

interface UploadPdfResponse {
  fileUrl?: string
  error?: string
}

interface DeletePdfResponse {
  ok?: boolean
  error?: string
}

/**
 * Obtiene la contraseña editorial configurada en el cliente
 * @returns {string} Contraseña o cadena vacía
 */
function getClientUploadPassword(): string {
  return import.meta.env.VITE_UPLOAD_PASSWORD?.trim() ?? ''
}

/**
 * Verifica acceso editorial antes de llamar a la API del servidor
 */
function assertCanUseUploadApi(): void {
  const passwordRequired = Boolean(getClientUploadPassword())

  if (passwordRequired && !hasUploadAccessInSession()) {
    throw new Error('Necesitas la contraseña editorial para subir archivos.')
  }
}

/**
 * Sube un PDF mediante la API del servidor (evita CORS de Firebase Storage)
 * @param storagePath - Ruta destino en el bucket
 * @param file - Archivo PDF
 * @returns {Promise<string>} URL de descarga del PDF
 */
export async function uploadPdfThroughApi(
  storagePath: string,
  file: File,
): Promise<string> {
  assertCanUseUploadApi()

  const dataBase64 = await fileToBase64(file)

  const response = await fetch('/api/upload-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      storagePath,
      fileName: file.name,
      contentType: file.type,
      dataBase64,
      password: getClientUploadPassword(),
    }),
  })

  const payload = (await response.json()) as UploadPdfResponse

  if (!response.ok || !payload.fileUrl) {
    throw new Error(payload.error ?? 'No se pudo subir el PDF.')
  }

  return payload.fileUrl
}

/**
 * Elimina un PDF mediante la API del servidor
 * @param storagePath - Ruta del archivo en Storage
 */
export async function deletePdfThroughApi(storagePath: string): Promise<void> {
  assertCanUseUploadApi()

  const response = await fetch('/api/delete-pdf', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      storagePath,
      password: getClientUploadPassword(),
    }),
  })

  const payload = (await response.json()) as DeletePdfResponse

  if (!response.ok) {
    throw new Error(payload.error ?? 'No se pudo eliminar el PDF.')
  }
}
