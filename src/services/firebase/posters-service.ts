import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  type DocumentData,
} from 'firebase/firestore'
import type { Poster, PosterDocument, UploadPosterInput } from '../../types/portal'
import { formatFileSize } from '../../utils/format-file-size'
import { sanitizeFileName } from '../../utils/sanitize-file-name'
import { getFirestoreDb } from './firebase-client'
import { uploadPdfFile, deletePdfFile } from '../pdf-storage/pdf-storage-service'

const POSTERS_COLLECTION = 'posters'

/**
 * Convierte un documento de Firestore en un cartel
 * @param id - ID del documento
 * @param data - Datos almacenados
 * @returns {Poster} Cartel normalizado
 */
function mapDocumentToPoster(id: string, data: DocumentData): Poster {
  const poster = data as PosterDocument

  return {
    id,
    title: poster.title,
    category: poster.category,
    event: poster.event,
    abstract: poster.abstract,
    publishedAt: poster.publishedAt,
    fileName: poster.fileName,
    fileSize: poster.fileSize,
    fileUrl: poster.fileUrl,
  }
}

/**
 * Obtiene carteles desde Firestore
 * @returns {Promise<Poster[]>} Lista de carteles
 */
export async function fetchPostersFromFirestore(): Promise<Poster[]> {
  const db = getFirestoreDb()
  const postersQuery = query(
    collection(db, POSTERS_COLLECTION),
    orderBy('createdAt', 'desc'),
  )
  const snapshot = await getDocs(postersQuery)

  return snapshot.docs.map((posterDoc) =>
    mapDocumentToPoster(posterDoc.id, posterDoc.data()),
  )
}

/**
 * Sube un cartel PDF a Storage y guarda los metadatos en Firestore
 * @param input - Datos del formulario y archivo PDF
 * @returns {Promise<Poster>} Cartel creado en la base de datos
 */
export async function uploadPosterToFirestore(input: UploadPosterInput): Promise<Poster> {
  const db = getFirestoreDb()
  const posterId = crypto.randomUUID()
  const safeFileName = sanitizeFileName(input.file.name)
  const storagePath = `posters/${posterId}/${safeFileName}`
  const publishedAt = new Date().toISOString().split('T')[0] ?? ''

  const fileUrl = await uploadPdfFile(storagePath, input.file)
  const posterData = {
    title: input.title,
    category: input.category,
    event: input.event || 'Sin evento',
    abstract: input.abstract,
    publishedAt,
    fileName: input.file.name,
    fileSize: formatFileSize(input.file.size),
    fileUrl,
    storagePath,
    createdAt: serverTimestamp(),
  }

  await setDoc(doc(db, POSTERS_COLLECTION, posterId), posterData)

  return {
    id: posterId,
    title: posterData.title,
    category: posterData.category,
    event: posterData.event,
    abstract: posterData.abstract,
    publishedAt: posterData.publishedAt,
    fileName: posterData.fileName,
    fileSize: posterData.fileSize,
    fileUrl: posterData.fileUrl,
  }
}

/**
 * Elimina un cartel de Firestore y su PDF en Storage
 * @param posterId - ID del documento a eliminar
 */
export async function deletePosterFromFirestore(posterId: string): Promise<void> {
  const db = getFirestoreDb()
  const posterRef = doc(db, POSTERS_COLLECTION, posterId)
  const snapshot = await getDoc(posterRef)

  if (!snapshot.exists()) {
    throw new Error('El cartel no existe o ya fue eliminado.')
  }

  const poster = snapshot.data() as PosterDocument

  if (poster.storagePath) {
    await deletePdfFile(poster.storagePath)
  }

  await deleteDoc(posterRef)
}
