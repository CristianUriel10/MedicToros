import { getSupabaseBucketName } from './config'
import { getSupabaseClient } from './supabase-client'

const MAX_PDF_BYTES = 20 * 1024 * 1024

/**
 * Sube un PDF a Supabase Storage (plan gratis, sin tarjeta)
 * @param storagePath - Ruta del archivo en el bucket
 * @param file - Archivo PDF del usuario
 * @returns {Promise<string>} URL pública del PDF
 */
export async function uploadPdfToSupabase(
  storagePath: string,
  file: File,
): Promise<string> {
  if (file.type !== 'application/pdf') {
    throw new Error('Solo se permiten archivos PDF.')
  }

  if (file.size > MAX_PDF_BYTES) {
    throw new Error('El PDF supera el límite de 20 MB.')
  }

  const supabase = getSupabaseClient()
  const bucket = getSupabaseBucketName()

  const { error } = await supabase.storage.from(bucket).upload(storagePath, file, {
    contentType: 'application/pdf',
    upsert: false,
  })

  if (error) {
    throw new Error(error.message)
  }

  const { data } = supabase.storage.from(bucket).getPublicUrl(storagePath)
  return data.publicUrl
}

/**
 * Elimina un PDF de Supabase Storage
 * @param storagePath - Ruta del archivo en el bucket
 */
export async function deletePdfFromSupabase(storagePath: string): Promise<void> {
  const supabase = getSupabaseClient()
  const bucket = getSupabaseBucketName()

  const { error } = await supabase.storage.from(bucket).remove([storagePath])

  if (error) {
    throw new Error(error.message)
  }
}
