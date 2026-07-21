import { categoryCoverImages, defaultCoverImage } from '../../data/portal-data'
import type { MedicalJournal } from '../../types/portal'
import { SectionLabel } from '../ui/section-label'

interface ArticleCardProps {
  journal: MedicalJournal
}

/**
 * Obtiene la imagen de portada de un artículo
 * @param journal - Revista a renderizar
 * @returns {string} URL de la imagen
 */
function getCoverImage(journal: MedicalJournal): string {
  return journal.coverImage ?? categoryCoverImages[journal.category] ?? defaultCoverImage
}

/**
 * Tarjeta individual de artículo científico
 * @param props - Datos de la revista
 * @returns {JSX.Element} Card de artículo
 */
function ArticleCard({ journal }: ArticleCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-sm bg-navy-800/50">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={getCoverImage(journal)}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-500">
          {journal.category}
        </span>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-white">{journal.title}</h3>
        <p className="mt-2 text-xs text-white/50">{journal.issue}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          {journal.fileUrl ? (
            <a
              href={journal.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors hover:text-white"
            >
              Leer PDF →
            </a>
          ) : (
            <span className="text-xs text-white/40">Próximamente</span>
          )}
          <span className="text-white/40" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </article>
  )
}

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
              <ArticleCard key={journal.id} journal={journal} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
