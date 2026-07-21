import { BrandLogo } from '../ui/brand-logo'
import { PrimaryButton } from '../ui/primary-button'
import { SectionLabel } from '../ui/section-label'

/**
 * Sección de archivo de ediciones impresas
 * @returns {JSX.Element} Bloque de ediciones anteriores
 */
export function ArchiveSection() {
  return (
    <section id="ediciones" className="relative overflow-hidden bg-surface-100 px-6 py-20 lg:px-10 lg:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <SectionLabel className="[&_span:last-child]:text-accent-500">
            Archivo de ediciones
          </SectionLabel>
          <h2 className="mt-4 text-3xl font-bold text-navy-900 md:text-4xl">
            Conocimiento que se construye edición tras edición
          </h2>
          <p className="mt-6 max-w-lg leading-relaxed text-navy-900/70">
            Accede al historial completo de publicaciones de MedicToros. Cada edición reúne
            artículos originales, revisiones sistemáticas y reportes clínicos revisados por
            pares.
          </p>
          <div className="mt-8">
            <PrimaryButton href="#articulos">Explorar ediciones</PrimaryButton>
          </div>
        </div>

        <div className="relative flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute -left-4 top-8 h-56 w-40 rotate-[-8deg] rounded-sm bg-navy-800 shadow-2xl" />
            <div className="absolute left-8 top-4 h-56 w-40 rotate-[-3deg] rounded-sm bg-navy-700 shadow-2xl" />
            <div className="relative z-10 overflow-hidden rounded-sm bg-navy-900 shadow-2xl">
              <div className="flex items-center justify-center bg-navy-900 p-8">
                <BrandLogo variant="bull" surface="dark" className="h-52 w-52" />
              </div>
              <div className="bg-navy-900 px-6 py-4 text-center">
                <p className="font-display text-xl font-bold uppercase tracking-wider text-white">
                  MedicToros
                </p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-accent-500">
                  Vol. 1 · Edición 2026
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
