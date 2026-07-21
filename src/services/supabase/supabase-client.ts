import { createClient, type SupabaseClient } from '@supabase/supabase-js'
import { getSupabaseAnonKey, getSupabaseUrl, isSupabaseStorageConfigured } from './config'

let supabaseClient: SupabaseClient | undefined

/**
 * Obtiene el cliente de Supabase inicializado una sola vez
 * @returns {SupabaseClient} Cliente de Supabase
 */
export function getSupabaseClient(): SupabaseClient {
  if (!isSupabaseStorageConfigured()) {
    throw new Error('Supabase no está configurado. Revisa VITE_SUPABASE_URL y VITE_SUPABASE_ANON_KEY.')
  }

  if (!supabaseClient) {
    supabaseClient = createClient(getSupabaseUrl(), getSupabaseAnonKey())
  }

  return supabaseClient
}
