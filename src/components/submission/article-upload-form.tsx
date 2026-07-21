import type { FormEvent } from 'react'
import { journalCategories } from '../../types/portal'
import { formatFileSize } from '../../utils/format-file-size'
import { PrimaryButton } from '../ui/primary-button'
import { submissionInputClassName } from './submission-form-styles'

interface ArticleFormState {
  title: string
  authors: string
  category: string
  issue: string
  abstract: string
}

interface ArticleUploadFormProps {
  formData: ArticleFormState
  selectedFile: File | null
  isUploading: boolean
  errorMessage: string
  isSubmitted: boolean
  showEditorLock: boolean
  onFieldChange: (field: keyof ArticleFormState, value: string) => void
  onFileChange: (file: File | null) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onLockEditor: () => void
}

/**
 * Formulario de subida de artículos PDF
 * @param props - Estado del formulario y callbacks
 * @returns {JSX.Element} Formulario de artículo
 */
export function ArticleUploadForm({
  formData,
  selectedFile,
  isUploading,
  errorMessage,
  isSubmitted,
  showEditorLock,
  onFieldChange,
  onFileChange,
  onSubmit,
  onLockEditor,
}: ArticleUploadFormProps) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <input
        type="text"
        required
        disabled={isUploading}
        placeholder="Título del artículo *"
        value={formData.title}
        onChange={(event) => onFieldChange('title', event.target.value)}
        className={submissionInputClassName}
      />
      <input
        type="text"
        required
        disabled={isUploading}
        placeholder="Autor(es) *"
        value={formData.authors}
        onChange={(event) => onFieldChange('authors', event.target.value)}
        className={submissionInputClassName}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <select
          required
          disabled={isUploading}
          value={formData.category}
          onChange={(event) => onFieldChange('category', event.target.value)}
          className={submissionInputClassName}
        >
          {journalCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          disabled={isUploading}
          placeholder="Vol. / Edición"
          value={formData.issue}
          onChange={(event) => onFieldChange('issue', event.target.value)}
          className={submissionInputClassName}
        />
      </div>
      <textarea
        required
        rows={3}
        disabled={isUploading}
        placeholder="Resumen *"
        value={formData.abstract}
        onChange={(event) => onFieldChange('abstract', event.target.value)}
        className={submissionInputClassName}
      />
      <input
        type="file"
        accept=".pdf,application/pdf"
        disabled={isUploading}
        aria-label="Archivo PDF del artículo"
        onChange={(event) => onFileChange(event.target.files?.[0] ?? null)}
        className="w-full text-sm text-white/70 file:mr-4 file:rounded-sm file:border-0 file:bg-accent-500 file:px-4 file:py-2 file:text-xs file:font-semibold file:uppercase file:text-white"
      />
      {selectedFile && (
        <p className="text-xs text-white/50">
          {selectedFile.name} — {formatFileSize(selectedFile.size)}
        </p>
      )}
      {errorMessage && (
        <p className="text-sm text-accent-500" role="alert">
          {errorMessage}
        </p>
      )}
      <PrimaryButton type="submit" disabled={isUploading}>
        {isUploading ? 'Enviando...' : 'Publicar artículo'}
      </PrimaryButton>
      {showEditorLock && (
        <button
          type="button"
          onClick={onLockEditor}
          className="ml-3 text-xs font-semibold uppercase tracking-wider text-white/50 transition-colors hover:text-white/80"
        >
          Cerrar acceso editorial
        </button>
      )}
      {isSubmitted && (
        <p className="text-sm text-green-400" role="status">
          ¡Artículo publicado correctamente!
        </p>
      )}
    </form>
  )
}

export type { ArticleFormState }
