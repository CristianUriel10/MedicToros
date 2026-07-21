import { navLinks } from '../../data/landing-data'

/**
 * Pie de página con enlaces y derechos reservados
 * @returns {JSX.Element} Footer de la landing page
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-brand-700 bg-brand-800 px-6 py-12 text-brand-100">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500 text-lg font-bold text-white"
            aria-hidden="true"
          >
            MT
          </span>
          <div>
            <p className="font-semibold text-white">Medic Toro</p>
            <p className="text-sm">Veterinaria especializada</p>
          </div>
        </div>

        <nav aria-label="Enlaces del pie de página">
          <ul className="flex flex-wrap justify-center gap-6">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="text-sm transition-colors hover:text-white"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <p className="mx-auto mt-8 max-w-6xl border-t border-white/10 pt-8 text-center text-sm">
        © {currentYear} Medic Toro. Todos los derechos reservados.
      </p>
    </footer>
  )
}
