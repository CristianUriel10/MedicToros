import { Link } from 'react-router-dom'
import { PublicationCover } from '../publication-cover/publication-cover'

interface PublicationCardProps {
  title: string
  category: string
  meta: string
  readPath: string
  hasPdf: boolean
}

/**
 * Tarjeta reutilizable que navega a una página de lectura dedicada
 * @param props - Datos de la publicación y ruta de lectura
 * @returns {JSX.Element} Card con enlace a página completa
 */
export function PublicationCard({
  title,
  category,
  meta,
  readPath,
  hasPdf,
}: PublicationCardProps) {
  const cardContent = (
    <>
      <PublicationCover category={category} label={category} />
      <div className="flex flex-1 flex-col p-5">
        <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-accent-500">
          {category}
        </span>
        <h3 className="mt-3 text-lg font-semibold leading-snug text-white">{title}</h3>
        <p className="mt-2 text-xs text-white/50">{meta}</p>
        <div className="mt-auto flex items-center justify-between pt-6">
          {hasPdf ? (
            <span className="text-xs font-semibold uppercase tracking-wider text-white/70 transition-colors group-hover:text-white">
              Abrir página de lectura →
            </span>
          ) : (
            <span className="text-xs text-white/40">Próximamente</span>
          )}
          <span className="text-white/40" aria-hidden="true">
            →
          </span>
        </div>
      </div>
    </>
  )

  if (!hasPdf) {
    return (
      <article className="flex flex-col overflow-hidden rounded-sm bg-navy-800/50">
        {cardContent}
      </article>
    )
  }

  return (
    <Link
      to={readPath}
      className="group flex flex-col overflow-hidden rounded-sm bg-navy-800/50 transition-transform hover:-translate-y-1 hover:shadow-lg"
    >
      {cardContent}
    </Link>
  )
}
