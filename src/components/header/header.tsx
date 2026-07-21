import { useState } from 'react'
import { Link } from 'react-router-dom'
import { navLinks } from '../../data/portal-data'
import { BrandLogo } from '../ui/brand-logo'

/**
 * Resuelve enlaces internos para funcionar desde cualquier ruta
 * @param href - Enlace del menú
 * @returns {string} URL compatible con React Router
 */
function resolveNavHref(href: string): string {
  return href.startsWith('#') ? `/${href}` : href
}

/**
 * Barra de navegación principal al estilo MedicToros
 * @returns {JSX.Element} Header con logo y menú
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-900/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-6 py-4 lg:px-10">
        <Link to="/" className="shrink-0">
          <BrandLogo variant="wordmark" surface="dark" />
        </Link>

        <nav
          className="hidden items-center gap-6 xl:flex"
          aria-label="Navegación principal"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={resolveNavHref(link.href)}
              className="text-[11px] font-semibold uppercase tracking-[0.12em] text-white/80 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-white xl:hidden"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-menu"
          aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          <span className="block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
          <span className="mt-1.5 block h-0.5 w-6 bg-current" />
        </button>
      </div>

      {isMenuOpen && (
        <nav
          id="mobile-menu"
          className="border-t border-white/10 px-6 py-4 xl:hidden"
          aria-label="Navegación móvil"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={resolveNavHref(link.href)}
                  className="block text-sm font-semibold uppercase tracking-wider text-white/80"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
