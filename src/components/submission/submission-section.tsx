import { useState } from 'react'
import type { FormEvent } from 'react'
import { usePublications } from '../../context/publications-context'
import { submissionFeatures } from '../../data/portal-data'
import { journalCategories, posterCategories, type SubmissionFeature } from '../../types/portal'
import { PublicationCover } from '../publication-cover/publication-cover'
import { PrimaryButton } from '../ui/primary-button'
import { SectionLabel } from '../ui/section-label'
import {
  ArticleUploadForm,
  type ArticleFormState,
} from './article-upload-form'
import { PosterUploadForm, type PosterFormState } from './poster-upload-form'
import { SubmissionAccessForm } from './submission-access-form'
import { formatStorageUploadError } from '../../utils/format-storage-upload-error'

const featureIcons: Record<SubmissionFeature['icon'], string> = {
  review: '◎',
  ethics: '⚖',
  scope: '◉',
  access: '↗',
}

type SubmissionTab = 'articulo' | 'cartel'

const initialArticleForm: ArticleFormState = {
  title: '',
  authors: '',
  category: journalCategories[0],
  issue: 'Vol. 1 - Núm. 1 - 2026',
  abstract: '',
}

const initialPosterForm: PosterFormState = {
  title: '',
  category: posterCategories[0],
  event: '',
  abstract: '',
}

/**
 * Sección de envío editorial con subida de artículos y carteles
 * @returns {JSX.Element} Bloque de envío de investigación
 */
export function SubmissionSection() {
  const {
    uploadArticle,
    uploadPoster,
    isUploading,
    isFirebaseEnabled,
    isUploadPasswordRequired,
    isUploadUnlocked,
    unlockUpload,
    lockUpload,
  } = usePublications()

  const [activeTab, setActiveTab] = useState<SubmissionTab>('articulo')
  const [articleForm, setArticleForm] = useState<ArticleFormState>(initialArticleForm)
  const [posterForm, setPosterForm] = useState<PosterFormState>(initialPosterForm)
  const [articleFile, setArticleFile] = useState<File | null>(null)
  const [posterFile, setPosterFile] = useState<File | null>(null)
  const [showPanel, setShowPanel] = useState(false)
  const [editorPassword, setEditorPassword] = useState('')
  const [accessErrorMessage, setAccessErrorMessage] = useState('')
  const [articleError, setArticleError] = useState('')
  const [posterError, setPosterError] = useState('')
  const [articleSubmitted, setArticleSubmitted] = useState(false)
  const [posterSubmitted, setPosterSubmitted] = useState(false)

  const handleOpenPanel = () => {
    setShowPanel(true)
    setAccessErrorMessage('')
  }

  const handleClosePanel = () => {
    setShowPanel(false)
    setEditorPassword('')
    setAccessErrorMessage('')
    setArticleError('')
    setPosterError('')
    setArticleSubmitted(false)
    setPosterSubmitted(false)
  }

  const handleAccessSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setAccessErrorMessage('')

    if (unlockUpload(editorPassword)) {
      setEditorPassword('')
      return
    }

    setAccessErrorMessage('Contraseña incorrecta. Solo el equipo editorial puede continuar.')
  }

  const handleLockEditor = () => {
    lockUpload()
    handleClosePanel()
  }

  const ensureEditorAccess = (): boolean => {
    if (isUploadPasswordRequired && !isUploadUnlocked) {
      return false
    }

    return true
  }

  const validatePdfFile = (file: File | null): string | null => {
    if (!file) {
      return 'Selecciona un archivo PDF para continuar.'
    }

    if (file.type !== 'application/pdf') {
      return 'Solo se permiten archivos en formato PDF.'
    }

    return null
  }

  const handleArticleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setArticleError('')
    setArticleSubmitted(false)

    if (!ensureEditorAccess()) {
      setArticleError('Necesitas la contraseña editorial para publicar.')
      return
    }

    const fileError = validatePdfFile(articleFile)
    if (fileError) {
      setArticleError(fileError)
      return
    }

    try {
      await uploadArticle({ ...articleForm, file: articleFile! })
      setArticleForm(initialArticleForm)
      setArticleFile(null)
      setArticleSubmitted(true)
    } catch (uploadError) {
      setArticleError(formatStorageUploadError(uploadError))
    }
  }

  const handlePosterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setPosterError('')
    setPosterSubmitted(false)

    if (!ensureEditorAccess()) {
      setPosterError('Necesitas la contraseña editorial para publicar.')
      return
    }

    const fileError = validatePdfFile(posterFile)
    if (fileError) {
      setPosterError(fileError)
      return
    }

    try {
      await uploadPoster({ ...posterForm, file: posterFile! })
      setPosterForm(initialPosterForm)
      setPosterFile(null)
      setPosterSubmitted(true)
    } catch (uploadError) {
      setPosterError(formatStorageUploadError(uploadError))
    }
  }

  return (
    <section id="envio" className="bg-navy-800 px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.2fr]">
          <div className="overflow-hidden rounded-sm">
            <PublicationCover
              category="Investigación Clínica"
              label="Investigación clínica"
              className="h-72 lg:min-h-[480px] lg:h-full"
            />
          </div>

          <div>
            <SectionLabel>Envío de trabajos</SectionLabel>
            <h2 className="mt-4 text-3xl font-bold text-white md:text-4xl">
              Tu investigación puede hacer la diferencia
            </h2>
            <p className="mt-4 max-w-xl leading-relaxed text-white/70">
              Publica artículos y carteles en MedicToros. Solo el equipo editorial puede
              subir o eliminar contenido con contraseña.
              {isFirebaseEnabled
                ? ' Los PDF se guardan en Firebase Storage y los metadatos en Firestore.'
                : ' Configura Firebase para persistir los envíos en la nube.'}
            </p>

            {!showPanel ? (
              <div className="mt-8">
                <PrimaryButton onClick={handleOpenPanel}>
                  Acceso editorial
                </PrimaryButton>
              </div>
            ) : isUploadPasswordRequired && !isUploadUnlocked ? (
              <SubmissionAccessForm
                editorPassword={editorPassword}
                accessErrorMessage={accessErrorMessage}
                onPasswordChange={setEditorPassword}
                onSubmit={handleAccessSubmit}
                onCancel={handleClosePanel}
              />
            ) : (
              <div className="mt-8">
                <div className="mb-6 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveTab('articulo')}
                    className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                      activeTab === 'articulo'
                        ? 'bg-accent-500 text-white'
                        : 'border border-white/20 text-white/70'
                    }`}
                  >
                    Artículo
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveTab('cartel')}
                    className={`rounded-sm px-4 py-2 text-xs font-semibold uppercase tracking-wider ${
                      activeTab === 'cartel'
                        ? 'bg-accent-500 text-white'
                        : 'border border-white/20 text-white/70'
                    }`}
                  >
                    Cartel
                  </button>
                </div>

                {activeTab === 'articulo' ? (
                  <ArticleUploadForm
                    formData={articleForm}
                    selectedFile={articleFile}
                    isUploading={isUploading}
                    errorMessage={articleError}
                    isSubmitted={articleSubmitted}
                    showEditorLock={isUploadPasswordRequired}
                    onFieldChange={(field, value) =>
                      setArticleForm((current) => ({ ...current, [field]: value }))
                    }
                    onFileChange={setArticleFile}
                    onSubmit={handleArticleSubmit}
                    onLockEditor={handleLockEditor}
                  />
                ) : (
                  <PosterUploadForm
                    formData={posterForm}
                    selectedFile={posterFile}
                    isUploading={isUploading}
                    errorMessage={posterError}
                    isSubmitted={posterSubmitted}
                    showEditorLock={isUploadPasswordRequired}
                    onFieldChange={(field, value) =>
                      setPosterForm((current) => ({ ...current, [field]: value }))
                    }
                    onFileChange={setPosterFile}
                    onSubmit={handlePosterSubmit}
                    onLockEditor={handleLockEditor}
                  />
                )}

                {isUploadUnlocked && (
                  <p className="mt-4 text-xs text-green-300">
                    Acceso editorial activo. También puedes eliminar publicaciones desde
                    las tarjetas del catálogo.
                  </p>
                )}
              </div>
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
