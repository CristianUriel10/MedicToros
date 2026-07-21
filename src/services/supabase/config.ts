const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? ''
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY ?? ''
const SUPABASE_BUCKET = import.meta.env.VITE_SUPABASE_BUCKET ?? 'medictoros-pdfs'

/**
 * Verifica si Supabase Storage está configurado para PDFs
 * @returns {boolean} true si hay URL y anon key
 */
export function isSupabaseStorageConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)
}

/**
 * Obtiene la URL del proyecto Supabase
 * @returns {string} URL del API de Supabase
 */
export function getSupabaseUrl(): string {
  return SUPABASE_URL
}

/**
 * Obtiene la clave anónima de Supabase
 * @returns {string} Anon key pública
 */
export function getSupabaseAnonKey(): string {
  return SUPABASE_ANON_KEY
}

/**
 * Obtiene el nombre del bucket de PDFs en Supabase
 * @returns {string} Nombre del bucket
 */
export function getSupabaseBucketName(): string {
  return SUPABASE_BUCKET
}
