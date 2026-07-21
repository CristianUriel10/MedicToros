import { useState } from 'react'
import type { FormEvent } from 'react'
import { contactFields } from '../../data/landing-data'

interface FormState {
  name: string
  email: string
  phone: string
  message: string
}

const initialFormState: FormState = {
  name: '',
  email: '',
  phone: '',
  message: '',
}

/**
 * Sección de contacto con formulario y datos de la clínica
 * @returns {JSX.Element} Formulario de contacto y información
 */
export function ContactSection() {
  const [formData, setFormData] = useState<FormState>(initialFormState)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitted(true)
    setFormData(initialFormState)
  }

  const handleChange = (
    field: keyof FormState,
    value: string,
  ) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  return (
    <section id="contacto" className="bg-white px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Contacto
          </span>
          <h2 className="mt-3 text-3xl font-bold text-brand-800 md:text-4xl">
            Estamos listos para atenderte
          </h2>
          <p className="mt-4 text-gray-600">
            Escríbenos para agendar una consulta o solicitar atención de emergencia.
            Responderemos a la brevedad.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-8">
            <div className="rounded-2xl bg-brand-800 p-8 text-white">
              <h3 className="text-xl font-semibold">Información de contacto</h3>
              <ul className="mt-6 space-y-4 text-brand-100">
                <li>
                  <p className="text-sm text-brand-100/70">Dirección</p>
                  <p>Av. Ganadera 123, Zona Rural, México</p>
                </li>
                <li>
                  <p className="text-sm text-brand-100/70">Teléfono</p>
                  <p>+52 (555) 123-4567</p>
                </li>
                <li>
                  <p className="text-sm text-brand-100/70">Correo</p>
                  <p>contacto@medictoros.com</p>
                </li>
                <li>
                  <p className="text-sm text-brand-100/70">Horario</p>
                  <p>Lun – Vie: 8:00 – 18:00 | Emergencias 24/7</p>
                </li>
              </ul>
            </div>

            <div className="rounded-2xl border border-accent-500/20 bg-accent-500/5 p-6">
              <p className="font-semibold text-accent-600">Emergencias</p>
              <p className="mt-2 text-sm text-gray-600">
                Para urgencias fuera de horario, llama directamente al número de
                emergencias y un veterinario estará disponible de inmediato.
              </p>
            </div>
          </div>

          <form
            className="rounded-2xl border border-gray-100 bg-gray-50 p-8"
            onSubmit={handleSubmit}
            noValidate
          >
            {contactFields.map((field) => (
              <div key={field.id} className="mb-5">
                <label
                  htmlFor={field.id}
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  {field.label}
                  {field.required && <span className="text-brand-600"> *</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={field.id}
                    name={field.id}
                    rows={4}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof FormState]}
                    onChange={(event) =>
                      handleChange(field.id as keyof FormState, event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
                  />
                ) : (
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required={field.required}
                    placeholder={field.placeholder}
                    value={formData[field.id as keyof FormState]}
                    onChange={(event) =>
                      handleChange(field.id as keyof FormState, event.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-brand-500"
                  />
                )}
              </div>
            ))}

            <button
              type="submit"
              className="w-full rounded-full bg-brand-600 px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-700"
            >
              Enviar mensaje
            </button>

            {isSubmitted && (
              <p
                className="mt-4 rounded-xl bg-accent-500/10 px-4 py-3 text-sm text-accent-600"
                role="status"
              >
                ¡Gracias! Hemos recibido tu mensaje. Te contactaremos pronto.
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
