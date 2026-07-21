import { PublicationCard } from '../publication-card/publication-card'
import { SectionLabel } from '../ui/section-label'
import type { MedicalJournal } from '../../types/portal'

interface ArticlesSectionProps {
  journals: MedicalJournal[]
  isLoading?: boolean
}

/**
 * Sección de últimos artículos publicados
 * @param props - Lista de revistas del catálogo
 * @returns {JSX.Element} Grid de artículos
 */
export function ArticlesSection({ journals, isLoading = false }: ArticlesSectionProps) {
  const featuredJournals = journals.slice(0, 6)

  return (
    <section id="articulos" className="bg-navy-900 px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto max-w-7xl">
        <SectionLabel>Últimos artículos</SectionLabel>
        <h2 className="mt-4 max-w-2xl text-3xl font-bold text-white md:text-4xl">
          Investigación actual. Impacto real.
        </h2>

        {isLoading ? (
          <p className="mt-12 text-center text-white/50">Cargando artículos...</p>
        ) : featuredJournals.length === 0 ? (
          <p className="mt-12 rounded border border-dashed border-white/20 px-6 py-12 text-center text-white/50">
            Aún no hay artículos publicados. Sé el primero en enviar tu investigación.
          </p>
        ) : (
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredJournals.map((journal) => (
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
      </div>
    </section>
  )
}
