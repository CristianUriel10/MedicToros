import { cert, getApps, initializeApp, type ServiceAccount } from 'firebase-admin/app'
import { getStorage, type Storage } from 'firebase-admin/storage'
import { existsSync, readFileSync } from 'node:fs'
import { resolve } from 'node:path'

/**
 * Indica si un valor de entorno es usable
 * @param value - Valor leído del entorno
 * @returns {boolean} true si tiene contenido válido
 */
function isValidEnvValue(value: string | undefined): value is string {
  return Boolean(value && value !== 'undefined')
}

/**
 * Obtiene el project ID desde credenciales de servicio
 * @param serviceAccount - Cuenta de servicio de Firebase
 * @returns {string} ID del proyecto
 */
function getProjectId(serviceAccount: ServiceAccount): string {
  const account = serviceAccount as ServiceAccount & { project_id?: string }
  return account.project_id ?? account.projectId ?? 'medictoros'
}

/**
 * Normaliza el nombre del bucket de Storage
 * @param bucketName - Nombre o URI gs:// del bucket
 * @returns {string} Nombre limpio del bucket
 */
function normalizeBucketName(bucketName: string): string {
  return bucketName.replace(/^gs:\/\//, '').trim()
}

/**
 * Obtiene credenciales de servicio desde variables de entorno o archivo local
 * @returns {ServiceAccount} Credenciales de Firebase Admin
 */
function getServiceAccount(): ServiceAccount {
  const inlineCredentials = process.env.FIREBASE_SERVICE_ACCOUNT

  if (isValidEnvValue(inlineCredentials)) {
    return JSON.parse(inlineCredentials) as ServiceAccount
  }

  const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS

  if (isValidEnvValue(credentialsPath)) {
    const absolutePath = resolve(process.cwd(), credentialsPath)

    if (!existsSync(absolutePath)) {
      throw new Error(
        `No se encontró ${credentialsPath}. Descarga la clave en Firebase → Service accounts.`,
      )
    }

    return JSON.parse(readFileSync(absolutePath, 'utf8')) as ServiceAccount
  }

  throw new Error(
    'Configura GOOGLE_APPLICATION_CREDENTIALS o FIREBASE_SERVICE_ACCOUNT para subir PDFs.',
  )
}

/**
 * Inicializa Firebase Admin SDK una sola vez
 */
function ensureAdminApp(): void {
  if (getApps().length) {
    return
  }

  const serviceAccount = getServiceAccount()

  initializeApp({
    credential: cert(serviceAccount),
    projectId: getProjectId(serviceAccount),
  })
}

/**
 * Obtiene la instancia de Firebase Storage Admin
 * @returns {Storage} Cliente de Storage del servidor
 */
export function getAdminStorage(): Storage {
  ensureAdminApp()
  return getStorage()
}

/**
 * Genera candidatos de bucket según proyecto y variables de entorno
 * @param projectId - ID del proyecto Firebase
 * @returns {string[]} Posibles nombres de bucket
 */
function getBucketCandidates(projectId: string): string[] {
  const configuredBuckets = [
    process.env.FIREBASE_STORAGE_BUCKET,
    process.env.VITE_FIREBASE_STORAGE_BUCKET,
  ]
    .filter(isValidEnvValue)
    .map(normalizeBucketName)

  const defaultBuckets = [`${projectId}.appspot.com`, `${projectId}.firebasestorage.app`]

  return [...new Set([...configuredBuckets, ...defaultBuckets])]
}

let resolvedBucketName: string | undefined

/**
 * Resuelve el bucket real de Firebase Storage disponible en el proyecto
 * @returns {Promise<Bucket>} Bucket listo para lectura/escritura
 */
export async function getWritableStorageBucket() {
  if (resolvedBucketName) {
    return getAdminStorage().bucket(resolvedBucketName)
  }

  const serviceAccount = getServiceAccount()
  const projectId = getProjectId(serviceAccount)
  const storage = getAdminStorage()

  for (const bucketName of getBucketCandidates(projectId)) {
    const bucket = storage.bucket(bucketName)
    const [exists] = await bucket.exists()

    if (exists) {
      resolvedBucketName = bucketName
      return bucket
    }
  }

  throw new Error(
    'No existe bucket de Storage. En Firebase Console abre Storage y pulsa "Comenzar".',
  )
}

/**
 * Formatea errores de Google Cloud en mensajes legibles
 * @param error - Error capturado
 * @returns {string} Mensaje para mostrar al usuario
 */
export function formatGoogleCloudError(error: unknown): string {
  if (error && typeof error === 'object') {
    const apiError = error as {
      message?: string
      response?: { data?: { error?: { message?: string } } }
    }

    const nestedMessage = apiError.response?.data?.error?.message

    if (nestedMessage) {
      return nestedMessage
    }
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Error al procesar la petición.'
}
