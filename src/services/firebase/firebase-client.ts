import { initializeApp, type FirebaseApp } from 'firebase/app'
import { connectFirestoreEmulator, getFirestore, type Firestore } from 'firebase/firestore'
import {
  connectStorageEmulator,
  getStorage,
  type FirebaseStorage,
} from 'firebase/storage'
import { getFirebaseConfig, isFirebaseConfigured } from './config'

export { isFirebaseConfigured }

let firebaseApp: FirebaseApp | undefined
let firestoreDb: Firestore | undefined
let firebaseStorage: FirebaseStorage | undefined
let emulatorsConnected = false

/**
 * Indica si la app usa emuladores locales de Firebase (sin CORS de Storage)
 * @returns {boolean} true cuando VITE_USE_FIREBASE_EMULATORS=true
 */
export function isUsingFirebaseEmulators(): boolean {
  return import.meta.env.VITE_USE_FIREBASE_EMULATORS === 'true'
}

/**
 * Conecta Firestore y Storage a emuladores locales en desarrollo
 * @param db - Instancia de Firestore
 * @param storage - Instancia de Storage
 */
function connectFirebaseEmulators(db: Firestore, storage: FirebaseStorage): void {
  if (!isUsingFirebaseEmulators() || emulatorsConnected) {
    return
  }

  connectFirestoreEmulator(db, '127.0.0.1', 8080)
  connectStorageEmulator(storage, '127.0.0.1', 9199)
  emulatorsConnected = true
}

/**
 * Inicializa Firebase solo una vez cuando hay configuración válida
 * @returns {FirebaseApp} Instancia de la app de Firebase
 */
function getFirebaseApp(): FirebaseApp {
  if (!isFirebaseConfigured()) {
    throw new Error('Firebase no está configurado. Revisa tu archivo .env')
  }

  if (!firebaseApp) {
    firebaseApp = initializeApp(getFirebaseConfig())
  }

  return firebaseApp
}

/**
 * Inicializa Firestore y Storage (y emuladores si aplica)
 */
function ensureFirebaseServices(): void {
  if (!firestoreDb) {
    firestoreDb = getFirestore(getFirebaseApp())
  }

  if (!firebaseStorage) {
    firebaseStorage = getStorage(getFirebaseApp())
  }

  connectFirebaseEmulators(firestoreDb, firebaseStorage)
}

/**
 * Obtiene la instancia de Firestore Database
 * @returns {Firestore} Cliente de Firestore
 */
export function getFirestoreDb(): Firestore {
  ensureFirebaseServices()
  return firestoreDb!
}

/**
 * Obtiene la instancia de Firebase Storage
 * @returns {FirebaseStorage} Cliente de Storage
 */
export function getFirebaseStorage(): FirebaseStorage {
  ensureFirebaseServices()
  return firebaseStorage!
}

/**
 * Inicializa Firestore y Storage al arrancar la app cuando hay .env configurado
 * @returns {string | null} ID del proyecto conectado o null en modo demo
 */
export function connectFirebase(): string | null {
  if (!isFirebaseConfigured()) {
    return null
  }

  ensureFirebaseServices()

  return getFirebaseConfig().projectId
}
