import type { Plugin } from 'vite'
import { loadEnv } from 'vite'
import { handlePdfApiRequest } from './upload-pdf-handler.js'

/**
 * Asigna una variable de entorno solo cuando hay valor real
 * @param key - Nombre de la variable
 * @param value - Valor a asignar
 */
function setEnvIfDefined(key: string, value: string | undefined): void {
  if (value && value !== 'undefined') {
    process.env[key] = value
  }
}

/**
 * Plugin de Vite que expone /api/upload-pdf y /api/delete-pdf en desarrollo
 * @returns {Plugin} Plugin de Vite
 */
export function uploadApiPlugin(): Plugin {
  return {
    name: 'medictoros-upload-api',
    configureServer(server) {
      const env = loadEnv(server.config.mode, process.cwd(), '')

      setEnvIfDefined(
        'UPLOAD_PASSWORD',
        env.UPLOAD_PASSWORD ?? env.VITE_UPLOAD_PASSWORD ?? process.env.UPLOAD_PASSWORD,
      )
      setEnvIfDefined(
        'FIREBASE_SERVICE_ACCOUNT',
        env.FIREBASE_SERVICE_ACCOUNT ?? process.env.FIREBASE_SERVICE_ACCOUNT,
      )
      setEnvIfDefined(
        'GOOGLE_APPLICATION_CREDENTIALS',
        env.GOOGLE_APPLICATION_CREDENTIALS ?? process.env.GOOGLE_APPLICATION_CREDENTIALS,
      )
      setEnvIfDefined(
        'FIREBASE_STORAGE_BUCKET',
        env.FIREBASE_STORAGE_BUCKET ??
          env.VITE_FIREBASE_STORAGE_BUCKET ??
          process.env.FIREBASE_STORAGE_BUCKET,
      )

      server.middlewares.use(async (request, response, next) => {
        const requestUrl = request.url ?? ''
        const pathname = requestUrl.split('?')[0] ?? ''

        if (
          pathname !== '/api/upload-pdf' &&
          pathname !== '/api/delete-pdf'
        ) {
          next()
          return
        }

        if (request.method === 'OPTIONS') {
          response.statusCode = 204
          response.end()
          return
        }

        if (request.method !== 'POST') {
          response.statusCode = 405
          response.end('Method not allowed')
          return
        }

        const chunks: Buffer[] = []

        request.on('data', (chunk: Buffer) => {
          chunks.push(chunk)
        })

        request.on('end', async () => {
          const body = Buffer.concat(chunks).toString('utf8')
          const apiResponse = await handlePdfApiRequest(
            request.method ?? 'POST',
            pathname,
            body,
          )

          response.statusCode = apiResponse.status
          response.setHeader('Content-Type', 'application/json')
          response.end(await apiResponse.text())
        })
      })
    },
  }
}
