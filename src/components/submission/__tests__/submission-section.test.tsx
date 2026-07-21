import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SubmissionSection } from '../submission-section'

describe('SubmissionSection', () => {
  it('renders the submission heading', () => {
    render(<SubmissionSection onUpload={vi.fn().mockResolvedValue(undefined)} />)

    expect(
      screen.getByRole('heading', {
        name: /tu investigación puede hacer la diferencia/i,
      }),
    ).toBeInTheDocument()
  })

  it('shows upload form after clicking guidelines button', async () => {
    const user = userEvent.setup()
    render(<SubmissionSection onUpload={vi.fn().mockResolvedValue(undefined)} />)

    await user.click(screen.getByRole('button', { name: /conoce las pautas de envío/i }))

    expect(screen.getByPlaceholderText(/título del artículo/i)).toBeInTheDocument()
  })

  it('calls onUpload when form is submitted with a PDF', async () => {
    const user = userEvent.setup()
    const onUpload = vi.fn().mockResolvedValue(undefined)
    render(<SubmissionSection onUpload={onUpload} />)

    await user.click(screen.getByRole('button', { name: /conoce las pautas de envío/i }))

    const pdfFile = new File(['pdf-content'], 'revista.pdf', { type: 'application/pdf' })

    await user.type(screen.getByPlaceholderText(/título del artículo/i), 'Nueva investigación')
    await user.type(screen.getByPlaceholderText(/autor\(es\)/i), 'Dr. Test')
    await user.type(screen.getByPlaceholderText(/resumen/i), 'Resumen de prueba')
    await user.upload(screen.getByLabelText(/archivo pdf/i), pdfFile)
    await user.click(screen.getByRole('button', { name: /publicar artículo/i }))

    expect(onUpload).toHaveBeenCalledWith(
      expect.objectContaining({
        title: 'Nueva investigación',
        authors: 'Dr. Test',
        file: pdfFile,
      }),
    )
  })
})
