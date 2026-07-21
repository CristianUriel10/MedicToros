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
import type { JournalDocument, MedicalJournal, UploadJournalInput } from '../../types/portal'
import { formatFileSize } from '../../utils/format-file-size'
import { sanitizeFileName } from '../../utils/sanitize-file-name'
import { getFirestoreDb } from './firebase-client'
import { uploadPdfFile, deletePdfFile } from '../pdf-storage/pdf-storage-service'

const JOURNALS_COLLECTION = 'journals'

/**
 * Convierte un documento de Firestore en una revista del portal
 * @param id - ID del documento
 * @param data - Datos almacenados en Firestore
 * @returns {MedicalJournal} Revista normalizada
 */
function mapDocumentToJournal(id: string, data: DocumentData): MedicalJournal {
  const journal = data as JournalDocument

  return {
    id,
    title: journal.title,
    authors: journal.authors,
    category: journal.category,
    issue: journal.issue,
    abstract: journal.abstract,
    publishedAt: journal.publishedAt,
    fileName: journal.fileName,
    fileSize: journal.fileSize,
    fileUrl: journal.fileUrl,
    coverImage: journal.coverImage,
  }
}

/**
 * Obtiene todas las revistas publicadas desde Firestore
 * @returns {Promise<MedicalJournal[]>} Lista de revistas ordenadas por fecha
 */
export async function fetchJournalsFromFirestore(): Promise<MedicalJournal[]> {
  const db = getFirestoreDb()
  const journalsQuery = query(
    collection(db, JOURNALS_COLLECTION),
    orderBy('createdAt', 'desc'),
  )
  const snapshot = await getDocs(journalsQuery)

  return snapshot.docs.map((journalDoc) =>
    mapDocumentToJournal(journalDoc.id, journalDoc.data()),
  )
}

/**
 * Sube un PDF a Storage y guarda los metadatos en Firestore
 * @param input - Datos del formulario y archivo PDF
 * @returns {Promise<MedicalJournal>} Revista creada en la base de datos
 */
export async function uploadJournalToFirestore(
  input: UploadJournalInput,
): Promise<MedicalJournal> {
  const db = getFirestoreDb()
  const journalId = crypto.randomUUID()
  const safeFileName = sanitizeFileName(input.file.name)
  const storagePath = `journals/${journalId}/${safeFileName}`
  const publishedAt = new Date().toISOString().split('T')[0] ?? ''

  const fileUrl = await uploadPdfFile(storagePath, input.file)
  const journalData = {
    title: input.title,
    authors: input.authors,
    category: input.category,
    issue: input.issue || 'Sin edición',
    abstract: input.abstract,
    publishedAt,
    fileName: input.file.name,
    fileSize: formatFileSize(input.file.size),
    fileUrl,
    storagePath,
    createdAt: serverTimestamp(),
  }

  await setDoc(doc(db, JOURNALS_COLLECTION, journalId), journalData)

  return {
    id: journalId,
    title: journalData.title,
    authors: journalData.authors,
    category: journalData.category,
    issue: journalData.issue,
    abstract: journalData.abstract,
    publishedAt: journalData.publishedAt,
    fileName: journalData.fileName,
    fileSize: journalData.fileSize,
    fileUrl: journalData.fileUrl,
  }
}

/**
 * Elimina un artículo de Firestore y su PDF en Storage
 * @param journalId - ID del documento a eliminar
 */
export async function deleteJournalFromFirestore(journalId: string): Promise<void> {
  const db = getFirestoreDb()
  const journalRef = doc(db, JOURNALS_COLLECTION, journalId)
  const snapshot = await getDoc(journalRef)

  if (!snapshot.exists()) {
    throw new Error('El artículo no existe o ya fue eliminado.')
  }

  const journal = snapshot.data() as JournalDocument

  if (journal.storagePath) {
    await deletePdfFile(journal.storagePath)
  }

  await deleteDoc(journalRef)
}
