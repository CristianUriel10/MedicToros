/**
 * Sección principal de bienvenida con llamada a la acción
 * @returns {JSX.Element} Hero con título, descripción y botones
 */
export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-gradient-to-br from-brand-800 via-brand-700 to-brand-600 px-6 py-24 text-white"
    >
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/20 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-64 w-64 rounded-full bg-accent-500/10 blur-3xl"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="mb-4 inline-block rounded-full bg-white/10 px-4 py-1 text-sm font-medium text-brand-100">
            Atención veterinaria de confianza
          </span>
          <h1 className="text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            Cuidamos la salud de tus toros con excelencia
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-brand-100">
            Medic Toro ofrece servicios veterinarios especializados para ganado, toros de
            lidia y animales de campo. Diagnóstico preciso, tratamientos efectivos y
            acompañamiento profesional en cada etapa.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#contacto"
              className="rounded-full bg-white px-8 py-3 text-sm font-semibold text-brand-800 transition-transform hover:scale-105"
            >
              Solicitar consulta
            </a>
            <a
              href="#servicios"
              className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Ver servicios
            </a>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-500 text-2xl">
                🐂
              </div>
              <div>
                <p className="font-semibold">Atención integral</p>
                <p className="text-sm text-brand-100">Campo, establo y clínica</p>
              </div>
            </div>
            <ul className="space-y-4 text-sm text-brand-100">
              <li className="flex items-start gap-3">
                <span className="mt-1 text-accent-500" aria-hidden="true">
                  ✓
                </span>
                Diagnóstico clínico y de laboratorio
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-accent-500" aria-hidden="true">
                  ✓
                </span>
                Protocolos de bioseguridad certificados
              </li>
              <li className="flex items-start gap-3">
                <span className="mt-1 text-accent-500" aria-hidden="true">
                  ✓
                </span>
                Seguimiento post-tratamiento personalizado
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
