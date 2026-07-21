import type { Handler, HandlerEvent } from '@netlify/functions'
import { handlePdfApiRequest } from '../../server/upload-pdf-handler'

/**
 * Netlify Function para subir PDFs sin CORS del navegador a Storage
 * @param event - Evento HTTP de Netlify
 * @returns {Promise<Response>} Respuesta JSON
 */
const handler: Handler = async (event: HandlerEvent) => {
  const response = await handlePdfApiRequest(
    event.httpMethod,
    '/api/upload-pdf',
    event.body ?? '',
  )

  return {
    statusCode: response.status,
    headers: { 'Content-Type': 'application/json' },
    body: await response.text(),
  }
}

export { handler }
