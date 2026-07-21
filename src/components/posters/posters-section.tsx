import { usePublications } from '../../context/publications-context'
import { confirmDeletePublication } from '../../utils/confirm-delete-publication'
import { formatStorageUploadError } from '../../utils/format-storage-upload-error'
import { PublicationCard } from '../publication-card/publication-card'
import { PrimaryButton } from '../ui/primary-button'
import { SectionLabel } from '../ui/section-label'
import type { Poster } from '../../types/portal'

interface PostersSectionProps {
  posters: Poster[]
  isLoading?: boolean
}

/**
 * Vista previa de carteles en la página principal
 * @param props - Lista de carteles disponibles
 * @returns {JSX.Element} Grid de carteles destacados
 */
export function PostersSection({ posters, isLoading = false }: PostersSectionProps) {
  const { isUploadUnlocked, isDeleting, deletePoster } = usePublications()
  const featuredPosters = posters.slice(0, 3)

  const handleDelete = async (poster: Poster) => {
    if (!confirmDeletePublication(poster.title)) {
      return
    }

    try {
      await deletePoster(poster.id)
    } catch (deleteError) {
      window.alert(formatStorageUploadError(deleteError))
    }
  }

  return (
    <section id="carteles" className="bg-navy-800 px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Carteles</SectionLabel>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold text-white md:text-4xl">
          Divulgación visual. Ciencia en formato cartel.
        </h2>
        <p className="mt-4 max-w-2xl text-white/60">
          Cada cartel abre su propia página para lectura del PDF, igual que los artículos
          de investigación.
        </p>

        {isLoading ? (
          <p className="mt-12 text-center text-white/50">Cargando carteles...</p>
        ) : featuredPosters.length === 0 ? (
          <p className="mt-12 rounded border border-dashed border-white/20 px-6 py-12 text-center text-white/50">
            No hay carteles publicados por el momento.
          </p>
        ) : (
          <>
            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredPosters.map((poster) => (
                <PublicationCard
                  key={poster.id}
                  title={poster.title}
                  category={poster.category}
                  meta={poster.event}
                  readPath={`/carteles/${poster.id}`}
                  hasPdf={Boolean(poster.fileUrl)}
                  canDelete={isUploadUnlocked}
                  isDeleting={isDeleting}
                  onDelete={() => void handleDelete(poster)}
                />
              ))}
            </div>
            <div className="mt-10 text-center">
              <PrimaryButton href="/carteles">Ver todos los carteles</PrimaryButton>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
