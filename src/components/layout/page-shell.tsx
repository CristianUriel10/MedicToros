import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Header } from '../header/header'

interface PageShellProps {
  title: string
  subtitle: string
  backTo?: string
  backLabel?: string
  children: ReactNode
}

/**
 * Layout base para páginas internas del portal
 * @param props - Título, subtítulo y contenido de la página
 * @returns {JSX.Element} Página con header y contenedor
 */
export function PageShell({
  title,
  subtitle,
  backTo = '/',
  backLabel = 'Volver al inicio',
  children,
}: PageShellProps) {
  return (
    <div className="min-h-screen bg-navy-900">
      <Header />
      <main className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        <Link
          to={backTo}
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.15em] text-white/60 transition-colors hover:text-white"
        >
          ← {backLabel}
        </Link>
        <h1 className="mt-6 text-4xl font-bold text-white md:text-5xl">{title}</h1>
        <p className="mt-4 max-w-3xl text-lg text-white/60">{subtitle}</p>
        <div className="mt-12">{children}</div>
      </main>
    </div>
  )
}
