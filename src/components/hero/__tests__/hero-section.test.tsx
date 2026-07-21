import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { HeroSection } from '../hero-section'

describe('HeroSection', () => {
  it('renders the main heading', () => {
    render(<HeroSection />)

    expect(
      screen.getByRole('heading', {
        name: /ciencia que impulsa la salud/i,
      }),
    ).toBeInTheDocument()
  })

  it('renders call-to-action links', () => {
    render(<HeroSection />)

    expect(screen.getByRole('link', { name: /ver últimos artículos/i })).toHaveAttribute(
      'href',
      '#articulos',
    )
  })

  it('renders the bull logo', () => {
    render(<HeroSection />)

    expect(screen.getByAltText(/logo del toro médico/i)).toBeInTheDocument()
  })
})
