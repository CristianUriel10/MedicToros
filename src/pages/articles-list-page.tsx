import { Link } from 'react-router-dom'
import { usePublications } from '../context/publications-context'

/**
 * Página completa del catálogo de artículos
 * @returns {JSX.Element} Listado de investigación actual
 */
export function ArticlesListPage() {
  const { articles, isLoadingArticles } = usePublications()

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
            />
          ))}
        </div>
      )}
    </PageShell>
  )
}
