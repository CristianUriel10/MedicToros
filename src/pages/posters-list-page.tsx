import { usePublications } from '../context/publications-context'
import { PublicationCard } from '../components/publication-card/publication-card'
import { PageShell } from '../components/layout/page-shell'

/**
 * Página completa del catálogo de carteles
 * @returns {JSX.Element} Listado de carteles científicos
 */
export function PostersListPage() {
  const { posters, isLoadingPosters } = usePublications()

  return (
    <PageShell
      title="Carteles científicos"
      subtitle="Consulta los carteles de congresos, simposios y jornadas. Cada cartel abre su propia página de lectura."
      backTo="/"
      backLabel="Volver al inicio"
    >
      {isLoadingPosters ? (
        <p className="text-center text-white/50">Cargando carteles...</p>
      ) : posters.length === 0 ? (
        <p className="rounded border border-dashed border-white/20 px-6 py-12 text-center text-white/50">
          No hay carteles publicados por el momento.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posters.map((poster) => (
            <PublicationCard
              key={poster.id}
              title={poster.title}
              category={poster.category}
              meta={poster.event}
              readPath={`/carteles/${poster.id}`}
              hasPdf={Boolean(poster.fileUrl)}
            />
          ))}
        </div>
      )}
    </PageShell>
  )
}
