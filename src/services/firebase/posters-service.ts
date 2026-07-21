import { collection, getDocs, orderBy, query, type DocumentData } from 'firebase/firestore'
import type { Poster, PosterDocument } from '../../types/portal'
import { getFirestoreDb } from './firebase-client'

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
