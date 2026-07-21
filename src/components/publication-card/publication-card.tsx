import { Link } from 'react-router-dom'
import { PublicationCover } from '../publication-cover/publication-cover'

interface PublicationCardProps {
  title: string
  category: string
  meta: string
  readPath: string
  hasPdf: boolean
  canDelete?: boolean
  isDeleting?: boolean
  onDelete?: () => void
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
  canDelete = false,
  isDeleting = false,
  onDelete,
}: PublicationCardProps) {
  const cardBody = (
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

  return (
    <article className="relative flex flex-col overflow-hidden rounded-sm bg-navy-800/50">
      {canDelete && onDelete && (
        <button
          type="button"
          disabled={isDeleting}
          onClick={(event) => {
            event.preventDefault()
            event.stopPropagation()
            onDelete()
          }}
          className="absolute right-3 top-3 z-10 rounded-sm border border-accent-500/40 bg-navy-950/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-accent-500 transition-colors hover:bg-accent-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isDeleting ? 'Eliminando...' : 'Eliminar'}
        </button>
      )}

      {!hasPdf ? (
        cardBody
      ) : (
        <Link
          to={readPath}
          className="group flex h-full flex-col transition-transform hover:-translate-y-1 hover:shadow-lg"
        >
          {cardBody}
        </Link>
      )}
    </article>
  )
}
