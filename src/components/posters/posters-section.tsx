import { PublicationCard } from '../publication-card/publication-card'
import { SectionLabel } from '../ui/section-label'
import type { Poster } from '../../types/portal'

interface PostersSectionProps {
  posters: Poster[]
  isLoading?: boolean
}

/**
 * Sección de carteles científicos en PDF
 * @param props - Lista de carteles disponibles
 * @returns {JSX.Element} Grid de carteles
 */
export function PostersSection({ posters, isLoading = false }: PostersSectionProps) {
  return (
    <section id="carteles" className="bg-navy-800 px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Carteles</SectionLabel>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold text-white md:text-4xl">
          Divulgación visual. Ciencia en formato cartel.
        </h2>
        <p className="mt-4 max-w-2xl text-white/60">
          Consulta los carteles presentados en congresos, simposios y jornadas. Cada cartel
          se abre en una página dedicada para lectura del PDF.
        </p>

        {isLoading ? (
          <p className="mt-12 text-center text-white/50">Cargando carteles...</p>
        ) : posters.length === 0 ? (
          <p className="mt-12 rounded border border-dashed border-white/20 px-6 py-12 text-center text-white/50">
            No hay carteles publicados por el momento.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
      </div>
    </section>
  )
}
