import { services } from '../../data/landing-data'
import type { ServiceItem } from '../../types/landing'

const iconMap: Record<ServiceItem['icon'], string> = {
  stethoscope: '🩺',
  scalpel: '🔬',
  syringe: '💉',
  ambulance: '🚑',
}

/**
 * Renderiza el ícono correspondiente a un servicio
 * @param icon - Identificador del ícono del servicio
 * @returns {string} Emoji representativo
 */
function getServiceIcon(icon: ServiceItem['icon']): string {
  return iconMap[icon]
}

/**
 * Sección que muestra los servicios veterinarios disponibles
 * @returns {JSX.Element} Grid de tarjetas de servicios
 */
export function ServicesSection() {
  return (
    <section id="servicios" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Servicios
          </span>
          <h2 className="mt-3 text-3xl font-bold text-brand-800 md:text-4xl">
            Soluciones veterinarias para cada necesidad
          </h2>
          <p className="mt-4 text-gray-600">
            Desde revisiones preventivas hasta intervenciones de urgencia, contamos con el
            equipo y la experiencia para proteger la salud de tu ganado.
          </p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.id}
              className="group rounded-2xl border border-gray-100 bg-gray-50 p-8 transition-all hover:border-brand-200 hover:shadow-lg"
            >
              <span
                className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-100 text-2xl transition-transform group-hover:scale-110"
                aria-hidden="true"
              >
                {getServiceIcon(service.icon)}
              </span>
              <h3 className="text-xl font-semibold text-brand-800">{service.title}</h3>
              <p className="mt-3 leading-relaxed text-gray-600">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
