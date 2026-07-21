import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { BrandLogo } from '../brand-logo'

describe('BrandLogo', () => {
  it('renders the wordmark image on dark surfaces', () => {
    render(<BrandLogo variant="wordmark" surface="dark" />)

    expect(
      screen.getByAltText(/revista de investigación médica/i),
    ).toHaveAttribute('src', '/assets/logo-wordmark.png')
  })

  it('renders the bull image with screen blend on dark surfaces', () => {
    render(<BrandLogo variant="bull" surface="dark" />)

    const logo = screen.getByAltText(/logo del toro médico/i)
    expect(logo).toHaveAttribute('src', '/assets/logo-bull.png')
    expect(logo.className).toContain('mix-blend-screen')
  })
})
