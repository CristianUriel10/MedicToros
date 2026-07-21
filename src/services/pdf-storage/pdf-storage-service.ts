import { deletePdfThroughApi, uploadPdfThroughApi } from '../firebase/storage-upload-api'
import { isSupabaseStorageConfigured } from '../supabase/config'
import { deletePdfFromSupabase, uploadPdfToSupabase } from '../supabase/pdf-storage-service'

/**
 * Indica si hay algún backend configurado para guardar PDFs
 * @returns {boolean} true si Supabase o API de Firebase están listos
 */
export function isPdfStorageConfigured(): boolean {
  return isSupabaseStorageConfigured()
}

/**
 * Sube un PDF usando Supabase (gratis) o la API de Firebase
 * @param storagePath - Ruta destino del archivo
 * @param file - Archivo PDF
 * @returns {Promise<string>} URL del PDF publicado
 */
export async function uploadPdfFile(storagePath: string, file: File): Promise<string> {
  if (isSupabaseStorageConfigured()) {
    return uploadPdfToSupabase(storagePath, file)
  }

  return uploadPdfThroughApi(storagePath, file)
}

/**
 * Elimina un PDF de Supabase o Firebase Storage
 * @param storagePath - Ruta del archivo
 */
export async function deletePdfFile(storagePath: string): Promise<void> {
  if (isSupabaseStorageConfigured()) {
    await deletePdfFromSupabase(storagePath)
    return
  }

  await deletePdfThroughApi(storagePath)
}
