import { Link, useParams } from 'react-router-dom'
import { usePublications } from '../context/publications-context'
import type { PublicationKind } from '../types/portal'
import { BrandLogo } from '../components/ui/brand-logo'

interface ReaderPageProps {
  kind: PublicationKind
}

/**
 * Página dedicada de lectura de PDF (ruta propia, no modal)
 * @param props - Tipo de publicación a mostrar
 * @returns {JSX.Element} Visor de PDF a pantalla completa
 */
export function ReaderPage({ kind }: ReaderPageProps) {
  const { id = '' } = useParams()
  const { findArticle, findPoster } = usePublications()

  const publication =
    kind === 'articulos' ? findArticle(id) : findPoster(id)

  const listPath = kind === 'articulos' ? '/articulos' : '/carteles'
  const listLabel = kind === 'articulos' ? 'Artículos' : 'Carteles'
  const typeLabel = kind === 'articulos' ? 'Artículo' : 'Cartel'

  return (
    <div className="flex min-h-screen flex-col bg-navy-950">
      <header className="border-b border-white/10 bg-navy-900 px-6 py-4 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
          <Link to="/">
            <BrandLogo variant="wordmark" surface="dark" />
          </Link>
          <div className="flex flex-wrap items-center gap-4">
            <Link
              to={listPath}
              className="text-xs font-semibold uppercase tracking-[0.15em] text-white/70 transition-colors hover:text-white"
            >
              ← Volver a {listLabel}
            </Link>
            {publication?.fileUrl && (
              <a
                href={publication.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-500 hover:text-accent-400"
              >
                Abrir en nueva pestaña
              </a>
            )}
          </div>
        </div>
      </header>

      {!publication ? (
        <main className="mx-auto flex max-w-3xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
          <h1 className="text-3xl font-bold text-white">{typeLabel} no encontrado</h1>
          <p className="mt-4 text-white/60">
            La publicación que buscas no existe o fue eliminada.
          </p>
          <Link
            to={listPath}
            className="mt-8 text-sm font-semibold uppercase tracking-wider text-accent-500"
          >
            Ir al catálogo de {listLabel.toLowerCase()}
          </Link>
        </main>
      ) : (
        <>
          <section className="border-b border-white/10 bg-navy-900 px-6 py-6 lg:px-10">
            <div className="mx-auto max-w-7xl">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
                {typeLabel}
              </span>
              <h1 className="mt-2 text-2xl font-bold text-white md:text-3xl">
                {publication.title}
              </h1>
              {'authors' in publication && (
                <p className="mt-2 text-sm text-white/60">{publication.authors}</p>
              )}
              {'event' in publication && (
                <p className="mt-2 text-sm text-white/60">{publication.event}</p>
              )}
            </div>
          </section>

          <main className="flex-1">
            {publication.fileUrl ? (
              <iframe
                title={`Lectura de ${publication.title}`}
                src={publication.fileUrl}
                className="h-[calc(100vh-180px)] min-h-[600px] w-full border-0 bg-white"
              />
            ) : (
              <div className="flex h-[calc(100vh-180px)] items-center justify-center px-6 text-white/60">
                El PDF de esta publicación aún no está disponible.
              </div>
            )}
          </main>
        </>
      )}
    </div>
  )
}
