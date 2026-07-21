import { usePublications } from '../context/publications-context'
import { PublicationCard } from '../components/publication-card/publication-card'
import { PageShell } from '../components/layout/page-shell'
import { confirmDeletePublication } from '../utils/confirm-delete-publication'
import { formatStorageUploadError } from '../utils/format-storage-upload-error'

/**
 * Página completa del catálogo de artículos
 * @returns {JSX.Element} Listado de investigación actual
 */
export function ArticlesListPage() {
  const {
    articles,
    isLoadingArticles,
    isUploadUnlocked,
    isDeleting,
    deleteArticle,
  } = usePublications()

  const handleDelete = async (title: string, id: string) => {
    if (!confirmDeletePublication(title)) {
      return
    }

    try {
      await deleteArticle(id)
    } catch (deleteError) {
      window.alert(formatStorageUploadError(deleteError))
    }
  }

  return (
    <PageShell
      title="Investigación actual"
      subtitle="Explora todos los artículos publicados en MedicToros. Selecciona uno para abrirlo en su página de lectura."
      backTo="/"
      backLabel="Volver al inicio"
    >
      {isLoadingArticles ? (
        <p className="text-center text-white/50">Cargando artículos...</p>
      ) : articles.length === 0 ? (
        <p className="rounded border border-dashed border-white/20 px-6 py-12 text-center text-white/50">
          Aún no hay artículos publicados.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((journal) => (
            <PublicationCard
              key={journal.id}
              title={journal.title}
              category={journal.category}
              meta={journal.issue}
              readPath={`/articulos/${journal.id}`}
              hasPdf={Boolean(journal.fileUrl)}
              canDelete={isUploadUnlocked}
              isDeleting={isDeleting}
              onDelete={() => void handleDelete(journal.title, journal.id)}
            />
          ))}
        </div>
      )}
    </PageShell>
  )
}
