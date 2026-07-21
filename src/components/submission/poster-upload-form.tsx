import type { FormEvent } from 'react'
import { posterCategories } from '../../types/portal'
import { formatFileSize } from '../../utils/format-file-size'
import { PrimaryButton } from '../ui/primary-button'
import { submissionInputClassName } from './submission-form-styles'

interface PosterFormState {
  title: string
  category: string
  event: string
  abstract: string
}

interface PosterUploadFormProps {
  formData: PosterFormState
  selectedFile: File | null
  isUploading: boolean
  errorMessage: string
  isSubmitted: boolean
  showEditorLock: boolean
  onFieldChange: (field: keyof PosterFormState, value: string) => void
  onFileChange: (file: File | null) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onLockEditor: () => void
}

/**
 * Formulario de subida de carteles PDF
 * @param props - Estado del formulario y callbacks
 * @returns {JSX.Element} Formulario de cartel
 */
export function PosterUploadForm({
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
}: PosterUploadFormProps) {
  return (
    <form className="space-y-4" onSubmit={onSubmit}>
      <input
        type="text"
        required
        disabled={isUploading}
        placeholder="Título del cartel *"
        value={formData.title}
        onChange={(event) => onFieldChange('title', event.target.value)}
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
          {posterCategories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
        <input
          type="text"
          required
          disabled={isUploading}
          placeholder="Evento / Congreso *"
          value={formData.event}
          onChange={(event) => onFieldChange('event', event.target.value)}
          className={submissionInputClassName}
        />
      </div>
      <textarea
        required
        rows={3}
        disabled={isUploading}
        placeholder="Resumen del cartel *"
        value={formData.abstract}
        onChange={(event) => onFieldChange('abstract', event.target.value)}
        className={submissionInputClassName}
      />
      <input
        type="file"
        accept=".pdf,application/pdf"
        disabled={isUploading}
        aria-label="Archivo PDF del cartel"
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
        {isUploading ? 'Enviando...' : 'Publicar cartel'}
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
          ¡Cartel publicado correctamente!
        </p>
      )}
    </form>
  )
}

export type { PosterFormState }
