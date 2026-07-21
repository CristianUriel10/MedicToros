import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroSection } from '../hero-section'

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />)

    expect(
      screen.getByRole('heading', {
        name: /cuidamos la salud de tus toros con excelencia/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders call-to-action links', () => {
    render(<HeroSection />)

    expect(screen.getByRole('link', { name: /solicitar consulta/i })).toHaveAttribute(
      'href',
      '#contacto',
    )
    expect(screen.getByRole('link', { name: /ver servicios/i })).toHaveAttribute(
      'href',
      '#servicios',
    )
  })

  it('renders feature list items', () => {
    render(<HeroSection />)

    expect(screen.getByText(/diagnóstico clínico y de laboratorio/i)).toBeInTheDocument()
  })
})
