import { stats } from '../../data/landing-data'

/**
 * Sección informativa sobre la clínica y sus valores
 * @returns {JSX.Element} Bloque de presentación con estadísticas
 */
export function AboutSection() {
  return (
    <section id="nosotros" className="bg-brand-50 px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-2">
        <div>
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Nosotros
          </span>
          <h2 className="mt-3 text-3xl font-bold text-brand-800 md:text-4xl">
            Comprometidos con el bienestar animal
          </h2>
          <p className="mt-6 leading-relaxed text-gray-600">
            En Medic Toro combinamos experiencia clínica, tecnología de diagnóstico y un
            trato humano para ofrecer la mejor atención a ganaderos, criadores y
            empresas del sector taurino.
          </p>
          <p className="mt-4 leading-relaxed text-gray-600">
            Nuestro equipo de veterinarios especializados trabaja con protocolos
            actualizados y un enfoque preventivo que reduce riesgos y mejora la
            productividad de cada operación.
          </p>

          <ul className="mt-8 space-y-3">
            {[
              'Equipo médico certificado y en formación continua',
              'Atención en campo y en instalaciones equipadas',
              'Reportes claros y seguimiento post-consulta',
            ].map((item) => (
              <li key={item} className="flex items-center gap-3 text-gray-700">
                <span
                  className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent-500 text-xs text-white"
                  aria-hidden="true"
                >
                  ✓
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white p-6 text-center shadow-sm"
            >
              <p className="text-3xl font-bold text-brand-600 md:text-4xl">{stat.value}</p>
              <p className="mt-2 text-sm text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
