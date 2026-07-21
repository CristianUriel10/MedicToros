import { useState } from 'react'
import type { FormEvent } from 'react'
import { submissionFeatures } from '../../data/portal-data'
import type { SubmissionFeature, UploadJournalInput } from '../../types/portal'
import { formatFileSize } from '../../utils/format-file-size'
import { journalCategories } from '../../types/portal'
import { PrimaryButton } from '../ui/primary-button'
import { SectionLabel } from '../ui/section-label'

const featureIcons: Record<SubmissionFeature['icon'], string> = {
  review: '◎',
  ethics: '⚖',
  scope: '◉',
  access: '↗',
}

interface UploadFormState {
  title: string
  authors: string
  category: string
  issue: string
  abstract: string
}

interface SubmissionSectionProps {
  onUpload: (input: UploadJournalInput) => Promise<void>
  isUploading?: boolean
  isFirebaseEnabled?: boolean
}

const initialFormState: UploadFormState = {
  title: '',
  authors: '',
  category: journalCategories[0],
  issue: 'Vol. 1 - Núm. 1 - 2026',
  abstract: '',
}

/**
 * Sección de envío de trabajos con formulario de subida
 * @param props - Callback de publicación y estado de carga
 * @returns {JSX.Element} Bloque de envío de investigación
 */
export function SubmissionSection({
  onUpload,
  isUploading = false,
  isFirebaseEnabled = false,
}: SubmissionSectionProps) {
  const [formData, setFormData] = useState<UploadFormState>(initialFormState)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  const updateField = (field: keyof UploadFormState, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrorMessage('')
    setIsSubmitted(false)

    if (!selectedFile) {
      setErrorMessage('Selecciona un archivo PDF para continuar.')
      return
    }

    if (selectedFile.type !== 'application/pdf') {
      setErrorMessage('Solo se permiten archivos en formato PDF.')
      return
    }

    try {
      await onUpload({ ...formData, file: selectedFile })
      setFormData(initialFormState)
      setSelectedFile(null)
      setIsSubmitted(true)
    } catch (uploadError) {
      const message =
        uploadError instanceof Error
          ? uploadError.message
          : 'No se pudo enviar el trabajo.'
      setErrorMessage(message)
    }
  }

  return (
    <section id="envio" className="bg-navy-800 px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="overflow-hidden rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1532187863486-abf9dbad1a84?w=800&h=900&fit=crop"
              alt="Investigadora en laboratorio"
              className="h-72 w-full object-cover lg:h-full lg:min-h-[480px]"
            />
          </div>

          <div>
            <SectionLabel>Envío de trabajos</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Tu investigación puede hacer la diferencia
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/70">
              Publica tu artículo en MedicToros y contribuye al avance de la medicina
              basada en evidencia.
              {isFirebaseEnabled
                ? ' Los PDF se almacenan en Firebase Storage y los metadatos en Firestore.'
                : ' Configura Firebase para persistir los envíos en la nube.'}
            </p>

            {!showForm ? (
              <div className="mt-8">
                <PrimaryButton onClick={() => setShowForm(true)}>
                  Conoce las pautas de envío
                </PrimaryButton>
              </div>
            ) : (
              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <input
                  type="text"
                  required
                  disabled={isUploading}
                  placeholder="Título del artículo *"
                  value={formData.title}
                  onChange={(event) => updateField('title', event.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-navy-900/50 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-500"
                />
                <input
                  type="text"
                  required
                  disabled={isUploading}
                  placeholder="Autor(es) *"
                  value={formData.authors}
                  onChange={(event) => updateField('authors', event.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-navy-900/50 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-500"
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <select
                    required
                    disabled={isUploading}
                    value={formData.category}
                    onChange={(event) => updateField('category', event.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-navy-900/50 px-4 py-3 text-sm text-white outline-none focus:border-accent-500"
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
                    onChange={(event) => updateField('issue', event.target.value)}
                    className="w-full rounded-sm border border-white/10 bg-navy-900/50 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-500"
                  />
                </div>
                <textarea
                  required
                  rows={3}
                  disabled={isUploading}
                  placeholder="Resumen *"
                  value={formData.abstract}
                  onChange={(event) => updateField('abstract', event.target.value)}
                  className="w-full rounded-sm border border-white/10 bg-navy-900/50 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-500"
                />
                <input
                  type="file"
                  accept=".pdf,application/pdf"
                  disabled={isUploading}
                  aria-label="Archivo PDF"
                  onChange={(event) => setSelectedFile(event.target.files?.[0] ?? null)}
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
                {isSubmitted && (
                  <p className="text-sm text-green-400" role="status">
                    ¡Trabajo enviado correctamente!
                  </p>
                )}
              </form>
            )}

            <ul className="mt-10 space-y-4">
              {submissionFeatures.map((feature) => (
                <li key={feature.id} className="flex items-center gap-4 text-white/80">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-white/20 text-sm"
                    aria-hidden="true"
                  >
                    {featureIcons[feature.icon]}
                  </span>
                  <span className="text-sm">{feature.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
