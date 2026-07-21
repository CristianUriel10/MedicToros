import { initializeApp, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'
import { getStorage, type FirebaseStorage } from 'firebase/storage'
import { getFirebaseConfig, isFirebaseConfigured } from './config'

let firebaseApp: FirebaseApp | undefined
let firestoreDb: Firestore | undefined
let firebaseStorage: FirebaseStorage | undefined

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
 * Obtiene la instancia de Firestore Database
 * @returns {Firestore} Cliente de Firestore
 */
export function getFirestoreDb(): Firestore {
  if (!firestoreDb) {
    firestoreDb = getFirestore(getFirebaseApp())
  }

  return firestoreDb
}

/**
 * Obtiene la instancia de Firebase Storage
 * @returns {FirebaseStorage} Cliente de Storage
 */
export function getFirebaseStorage(): FirebaseStorage {
  if (!firebaseStorage) {
    firebaseStorage = getStorage(getFirebaseApp())
  }

  return firebaseStorage
}
