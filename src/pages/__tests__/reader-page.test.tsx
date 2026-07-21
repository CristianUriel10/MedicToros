import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, expect, it } from 'vitest'
import { PublicationsProvider } from '../../context/publications-context'
import { ReaderPage } from '../reader-page'

/**
 * Wrapper de prueba con router y contexto de publicaciones
 * @returns {ReturnType<typeof render>} Resultado del render
 */
function renderArticleReader() {
  return render(
    <MemoryRouter initialEntries={['/articulos/journal-1']}>
      <PublicationsProvider>
        <Routes>
          <Route path="/articulos/:id" element={<ReaderPage kind="articulos" />} />
        </Routes>
      </PublicationsProvider>
    </MemoryRouter>,
  )
}

describe('ReaderPage', () => {
  it('renders article reader with PDF iframe', async () => {
    renderArticleReader()

    await waitFor(() => {
      expect(
        screen.getByRole('heading', {
          name: /avances en tratamiento de hipertensión arterial/i,
        }),
      ).toBeInTheDocument()
    })

    expect(screen.getByTitle(/lectura de/i)).toBeInTheDocument()
  })
})
