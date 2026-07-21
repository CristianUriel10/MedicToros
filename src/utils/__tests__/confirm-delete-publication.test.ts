import { describe, expect, it, vi } from 'vitest'
import { confirmDeletePublication } from '../confirm-delete-publication'

describe('confirmDeletePublication', () => {
  it('returns true when the user confirms deletion', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true)

    expect(confirmDeletePublication('Artículo de prueba')).toBe(true)
  })

  it('returns false when the user cancels deletion', () => {
    vi.spyOn(window, 'confirm').mockReturnValue(false)

    expect(confirmDeletePublication('Artículo de prueba')).toBe(false)
  })
})
