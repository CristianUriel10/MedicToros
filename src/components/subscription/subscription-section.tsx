import { useState } from 'react'
import type { FormEvent } from 'react'
import { PrimaryButton } from '../ui/primary-button'

/**
 * Sección de suscripción al boletín de la revista
 * @returns {JSX.Element} Formulario de suscripción
 */
export function SubscriptionSection() {
  const [email, setEmail] = useState('')
  const [accepted, setAccepted] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!accepted) {
      return
    }

    setIsSubmitted(true)
    setEmail('')
    setAccepted(false)
  }

  return (
    <section id="suscripcion" className="relative overflow-hidden bg-navy-800">
      <div className="mx-auto grid max-w-7xl lg:grid-cols-[1fr_1.4fr]">
        <div className="flex flex-col justify-center bg-accent-500 px-8 py-12 lg:px-12">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
            Suscripción
          </p>
          <h2 className="mt-3 text-2xl font-bold text-white md:text-3xl">
            Mantente al día con lo último en investigación médica
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-white/80">
            Recibe alertas de nuevos artículos, ediciones y convocatorias de envío.
          </p>
        </div>

        <div className="relative flex flex-col justify-center px-8 py-12 lg:px-12">
          <div
            className="pointer-events-none absolute right-0 top-1/2 hidden -translate-y-1/2 opacity-10 lg:block"
            aria-hidden="true"
          >
            <svg viewBox="0 0 120 120" className="h-40 w-40 text-accent-500" fill="none">
              <circle cx="60" cy="50" r="30" stroke="currentColor" strokeWidth="2" />
              <path d="M40 80 L80 80 L85 95 L35 95 Z" stroke="currentColor" strokeWidth="2" />
              <line x1="60" y1="20" x2="60" y2="5" stroke="currentColor" strokeWidth="2" />
            </svg>
          </div>

          <form onSubmit={handleSubmit} className="relative z-10">
            <div className="flex flex-col gap-4 sm:flex-row">
              <label className="flex-1">
                <span className="sr-only">Correo electrónico</span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="tu@correo.com"
                  className="w-full rounded-sm border border-white/10 bg-navy-900/50 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-accent-500"
                />
              </label>
              <PrimaryButton type="submit">Suscribirme</PrimaryButton>
            </div>
            <label className="mt-4 flex items-start gap-3 text-xs text-white/50">
              <input
                type="checkbox"
                checked={accepted}
                onChange={(event) => setAccepted(event.target.checked)}
                className="mt-0.5 accent-accent-500"
              />
              Acepto la política de privacidad y el tratamiento de mis datos.
            </label>
            {isSubmitted && (
              <p className="mt-4 text-sm text-green-400" role="status">
                ¡Suscripción registrada! Pronto recibirás novedades.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
