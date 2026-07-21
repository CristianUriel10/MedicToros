import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { ContactSection } from '../contact-section'

describe('ContactSection', () => {
  it('renders the contact form fields', () => {
    render(<ContactSection />)

    expect(screen.getByLabelText(/nombre completo/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar mensaje/i })).toBeInTheDocument()
  })

  it('shows success message after form submission', async () => {
    const user = userEvent.setup()
    render(<ContactSection />)

    await user.type(screen.getByLabelText(/nombre completo/i), 'Juan Pérez')
    await user.type(screen.getByLabelText(/correo electrónico/i), 'juan@test.com')
    await user.type(screen.getByLabelText(/mensaje/i), 'Necesito una consulta')
    await user.click(screen.getByRole('button', { name: /enviar mensaje/i }))

    expect(
      await screen.findByText(/hemos recibido tu mensaje/i),
    ).toBeInTheDocument()
  })

  it('renders emergency contact information', () => {
    render(<ContactSection />)

    expect(screen.getByText(/emergencias 24\/7/i)).toBeInTheDocument()
  })
})
