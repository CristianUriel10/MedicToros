import { Link, useParams } from 'react-router-dom'
import { usePublications } from '../context/publications-context'
import type { PublicationKind } from '../types/portal'
import { Header } from '../components/header/header'
import { PrimaryButton } from '../components/ui/primary-button'

interface ReaderPageProps {
  kind: PublicationKind
}

/**
 * Página de lectura de PDF para artículos o carteles
 * @param props - Tipo de publicación a mostrar
 * @returns {JSX.Element} Visor de PDF en página aparte
 */
export function ReaderPage({ kind }: ReaderPageProps) {
  const { id = '' } = useParams()
  const { findArticle, findPoster } = usePublications()

  const publication =
    kind === 'articulos' ? findArticle(id) : findPoster(id)

  const backHref = kind === 'articulos' ? '/#articulos' : '/#carteles'
  const label = kind === 'articulos' ? 'Artículo' : 'Cartel'

  return (
    <div className="min-h-screen bg-navy-950">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <PrimaryButton href={backHref}>Volver al inicio</PrimaryButton>
          {publication?.fileUrl && (
            <a
              href={publication.fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold uppercase tracking-wider text-white/70 hover:text-white"
            >
              Abrir PDF en nueva pestaña →
            </a>
          )}
        </div>

        {!publication ? (
          <div className="rounded-sm border border-white/10 bg-navy-900 p-10 text-center">
            <h1 className="text-2xl font-bold text-white">{label} no encontrado</h1>
            <p className="mt-4 text-white/60">
              La publicación que buscas no existe o fue eliminada.
            </p>
            <Link
              to="/"
              className="mt-6 inline-block text-sm font-semibold uppercase tracking-wider text-accent-500"
            >
              Ir al inicio
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-6 border-b border-white/10 pb-6">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
                {label}
              </span>
              <h1 className="mt-2 text-3xl font-bold text-white md:text-4xl">
                {publication.title}
              </h1>
              {'authors' in publication && (
                <p className="mt-2 text-sm text-white/60">{publication.authors}</p>
              )}
              {'event' in publication && (
                <p className="mt-2 text-sm text-white/60">{publication.event}</p>
              )}
              <p className="mt-2 text-xs text-white/40">{publication.fileName}</p>
            </div>

            {publication.fileUrl ? (
              <div className="overflow-hidden rounded-sm border border-white/10 bg-white">
                <iframe
                  title={`Lectura de ${publication.title}`}
                  src={publication.fileUrl}
                  className="h-[80vh] w-full"
                />
              </div>
            ) : (
              <div className="rounded-sm border border-dashed border-white/20 p-10 text-center text-white/60">
                El PDF de esta publicación aún no está disponible.
              </div>
            )}
          </>
        )}
      </main>
    </div>
  )
}
