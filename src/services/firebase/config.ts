/**
 * Configuración de Firebase leída desde variables de entorno de Vite
 */
export interface FirebaseConfig {
  apiKey: string
  authDomain: string
  projectId: string
  storageBucket: string
  messagingSenderId: string
  appId: string
}

const firebaseConfig: FirebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
}

/**
 * Verifica si las variables mínimas de Firebase están configuradas
 * @returns {boolean} true si Firebase puede inicializarse
 */
export function isFirebaseConfigured(): boolean {
  return Boolean(firebaseConfig.apiKey && firebaseConfig.projectId)
}

/**
 * Obtiene la configuración de Firebase para inicializar la app
 * @returns {FirebaseConfig} Configuración del proyecto
 */
export function getFirebaseConfig(): FirebaseConfig {
  return firebaseConfig
}
