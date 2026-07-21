import { footerColumns } from '../../data/portal-data'
import { BrandLogo } from '../ui/brand-logo'

/**
 * Pie de página con navegación y redes sociales
 * @returns {JSX.Element} Footer del portal
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy-950 px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <BrandLogo variant="wordmark" surface="dark" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/50">
              Revista de investigación médica dedicada a la difusión del conocimiento
              científico con rigor, ética e impacto en la salud pública.
            </p>
            <div className="mt-6 flex gap-4">
              {['Facebook', 'LinkedIn', 'Instagram'].map((network) => (
                <span
                  key={network}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-[10px] font-semibold uppercase text-white/50"
                  title={network}
                >
                  {network.slice(0, 2)}
                </span>
              ))}
            </div>
          </div>

          {footerColumns.map((column) => (
            <div key={column.title}>
              <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white">
                {column.title}
              </h3>
              <ul className="mt-4 space-y-3">
                {column.links.map((link) => (
                  <li key={link.href + link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 transition-colors hover:text-white"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-white/40 md:flex-row">
          <p>© {currentYear} MedicToros. Todos los derechos reservados.</p>
          <p>Hecho con ♥ para la comunidad científica</p>
        </div>
      </div>
    </footer>
  )
}
