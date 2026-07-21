import { BrandLogo } from '../ui/brand-logo'
import { EkgLine } from '../ui/ekg-line'
import { PrimaryButton } from '../ui/primary-button'

/**
 * Sección hero principal del portal MedicToros
 * @returns {JSX.Element} Hero con titular y logo del toro
 */
export function HeroSection() {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden bg-navy-900 px-6 py-16 lg:px-10 lg:py-24"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(193,18,31,0.08),transparent_55%)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <div>
          <h1 className="text-4xl font-bold uppercase leading-[1.05] tracking-tight text-white md:text-5xl lg:text-6xl">
            Ciencia que impulsa la salud
          </h1>
          <div className="mt-4">
            <EkgLine />
          </div>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            MedicToros es una revista de investigación médica comprometida con la difusión
            de conocimiento científico riguroso, la ética en la investigación y el impacto
            real en la salud de las personas.
          </p>
          <div className="mt-8">
            <PrimaryButton href="#articulos">Ver últimos artículos</PrimaryButton>
          </div>
        </div>

        <div className="flex justify-center bg-navy-900 lg:justify-end">
          <BrandLogo
            variant="bull"
            surface="dark"
            className="w-full max-w-md drop-shadow-2xl lg:max-w-lg"
          />
        </div>
      </div>
    </section>
  )
}
