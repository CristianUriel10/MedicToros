import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { PublicationsProvider } from '../../../context/publications-context'
import { revokeUploadAccessInSession } from '../../../utils/upload-access'
import { SubmissionSection } from '../submission-section'

function renderSubmissionSection() {
  return render(
    <PublicationsProvider>
      <SubmissionSection />
    </PublicationsProvider>,
  )
}

describe('SubmissionSection', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    revokeUploadAccessInSession()
  })

  it('renders the submission heading', () => {
    vi.stubEnv('VITE_UPLOAD_PASSWORD', '')
    renderSubmissionSection()

    expect(
      screen.getByRole('heading', {
        name: /tu investigación puede hacer la diferencia/i,
      }),
    ).toBeInTheDocument()
  })

  it('shows article upload form after opening editorial access', async () => {
    vi.stubEnv('VITE_UPLOAD_PASSWORD', '')
    const user = userEvent.setup()
    renderSubmissionSection()

    await user.click(screen.getByRole('button', { name: /acceso editorial/i }))

    expect(screen.getByPlaceholderText(/título del artículo/i)).toBeInTheDocument()
  })

  it('asks for editor password before showing upload tabs', async () => {
    vi.stubEnv('VITE_UPLOAD_PASSWORD', 'editor-secret')
    const user = userEvent.setup()
    renderSubmissionSection()

    await user.click(screen.getByRole('button', { name: /acceso editorial/i }))

    expect(screen.getByPlaceholderText(/contraseña editorial/i)).toBeInTheDocument()

    await user.type(screen.getByPlaceholderText(/contraseña editorial/i), 'editor-secret')
    await user.click(screen.getByRole('button', { name: /acceder al panel editorial/i }))

    expect(screen.getByPlaceholderText(/título del artículo/i)).toBeInTheDocument()
  })

  it('shows poster upload form when cartel tab is selected', async () => {
    vi.stubEnv('VITE_UPLOAD_PASSWORD', '')
    const user = userEvent.setup()
    renderSubmissionSection()

    await user.click(screen.getByRole('button', { name: /acceso editorial/i }))
    await user.click(screen.getByRole('button', { name: /^cartel$/i }))

    expect(screen.getByPlaceholderText(/título del cartel/i)).toBeInTheDocument()
  })
})
