import { useState } from 'react'
import { navLinks } from '../../data/landing-data'

/**
 * Barra de navegación principal de la landing page
 * @returns {JSX.Element} Encabezado con logo y menú responsive
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-brand-800/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="#inicio" className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-white"
            aria-hidden="true"
          >
            MT
          </span>
          <div className="text-left">
            <p className="text-lg font-semibold leading-tight text-white">Medic Toro</p>
            <p className="text-xs text-brand-100">Veterinaria especializada</p>
          </div>
        </a>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Navegación principal">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-brand-100 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contacto"
            className="rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-600"
          >
            Agendar cita
          </a>
        </nav>

        <button
          type="button"
          className="rounded-lg p-2 text-white md:hidden"
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
          className="border-t border-white/10 px-6 py-4 md:hidden"
          aria-label="Navegación móvil"
        >
          <ul className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="block text-brand-100 transition-colors hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href="#contacto"
                className="inline-block rounded-full bg-accent-500 px-5 py-2 text-sm font-semibold text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Agendar cita
              </a>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
