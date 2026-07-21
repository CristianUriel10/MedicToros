import { randomUUID } from 'node:crypto'
import {
  formatGoogleCloudError,
  getWritableStorageBucket,
} from './firebase-admin-app.js'

const MAX_PDF_BYTES = 20 * 1024 * 1024
const STORAGE_PATH_PATTERN = /^(journals|posters)\/[0-9a-f-]{36}\/[a-z0-9.-]+\.pdf$/i

interface UploadPdfPayload {
  storagePath?: string
  fileName?: string
  contentType?: string
  dataBase64?: string
  password?: string
}

interface DeletePdfPayload {
  storagePath?: string
  password?: string
}

/**
 * Parsea el cuerpo JSON de una petición HTTP
 * @param body - Texto recibido en la petición
 * @returns {UploadPdfPayload & DeletePdfPayload} Datos parseados
 */
function parseRequestBody(body: string): UploadPdfPayload & DeletePdfPayload {
  if (!body.trim()) {
    throw new Error('La petición no incluye datos JSON.')
  }

  try {
    return JSON.parse(body) as UploadPdfPayload & DeletePdfPayload
  } catch {
    throw new Error('El cuerpo de la petición no es JSON válido.')
  }
}

/**
 * Valida la contraseña editorial del servidor
 * @param password - Contraseña enviada por el cliente
 */
function assertEditorPassword(password: string | undefined): void {
  const expectedPassword = process.env.UPLOAD_PASSWORD?.trim() ?? ''

  if (!expectedPassword) {
    return
  }

  if (password !== expectedPassword) {
    throw new Error('Contraseña editorial incorrecta.')
  }
}

/**
 * Valida que la ruta de Storage sea segura
 * @param storagePath - Ruta destino en el bucket
 */
function assertValidStoragePath(storagePath: string): void {
  if (!STORAGE_PATH_PATTERN.test(storagePath)) {
    throw new Error('Ruta de archivo no permitida.')
  }
}

/**
 * Construye la URL pública de descarga compatible con Firebase Storage
 * @param bucketName - Nombre del bucket
 * @param storagePath - Ruta del archivo
 * @param downloadToken - Token de descarga
 * @returns {string} URL del PDF
 */
function buildFirebaseDownloadUrl(
  bucketName: string,
  storagePath: string,
  downloadToken: string,
): string {
  return `https://firebasestorage.googleapis.com/v0/b/${bucketName}/o/${encodeURIComponent(storagePath)}?alt=media&token=${downloadToken}`
}

/**
 * Sube un PDF al bucket usando Firebase Admin (sin CORS en el navegador)
 * @param payload - Datos del archivo en base64
 * @returns {Promise<{ fileUrl: string }>} URL del PDF subido
 */
export async function handleUploadPdfRequest(
  payload: UploadPdfPayload,
): Promise<{ fileUrl: string }> {
  assertEditorPassword(payload.password)

  const storagePath = payload.storagePath?.trim() ?? ''
  const contentType = payload.contentType ?? 'application/pdf'
  const dataBase64 = payload.dataBase64 ?? ''

  assertValidStoragePath(storagePath)

  if (contentType !== 'application/pdf') {
    throw new Error('Solo se permiten archivos PDF.')
  }

  const fileBuffer = Buffer.from(dataBase64, 'base64')

  if (!fileBuffer.length) {
    throw new Error('El archivo PDF está vacío.')
  }

  if (fileBuffer.length > MAX_PDF_BYTES) {
    throw new Error('El PDF supera el límite de 20 MB.')
  }

  const downloadToken = randomUUID()
  const bucket = await getWritableStorageBucket()
  const file = bucket.file(storagePath)

  await file.save(fileBuffer, {
    metadata: {
      contentType: 'application/pdf',
      metadata: {
        firebaseStorageDownloadTokens: downloadToken,
      },
    },
  })

  return {
    fileUrl: buildFirebaseDownloadUrl(bucket.name, storagePath, downloadToken),
  }
}

/**
 * Elimina un PDF del bucket usando Firebase Admin
 * @param payload - Ruta del archivo a eliminar
 */
export async function handleDeletePdfRequest(payload: DeletePdfPayload): Promise<void> {
  assertEditorPassword(payload.password)

  const storagePath = payload.storagePath?.trim() ?? ''
  assertValidStoragePath(storagePath)

  const bucket = await getWritableStorageBucket()
  await bucket.file(storagePath).delete({ ignoreNotFound: true })
}

/**
 * Procesa una petición HTTP de subida o eliminación de PDF
 * @param method - Método HTTP
 * @param pathname - Ruta solicitada
 * @param body - Cuerpo JSON de la petición
 * @returns {Promise<Response>} Respuesta HTTP
 */
export async function handlePdfApiRequest(
  method: string,
  pathname: string,
  body: string,
): Promise<Response> {
  try {
    if (method === 'OPTIONS') {
      return new Response(null, { status: 204 })
    }

    const payload = parseRequestBody(body)

    if (method === 'POST' && pathname === '/api/upload-pdf') {
      const result = await handleUploadPdfRequest(payload)
      return Response.json(result)
    }

    if (method === 'POST' && pathname === '/api/delete-pdf') {
      await handleDeletePdfRequest(payload)
      return Response.json({ ok: true })
    }

    return Response.json({ error: 'Ruta no encontrada.' }, { status: 404 })
  } catch (error) {
    return Response.json({ error: formatGoogleCloudError(error) }, { status: 400 })
  }
}
