import { describe, expect, it } from 'vitest'
import { sanitizeFileName } from '../sanitize-file-name'

describe('sanitizeFileName', () => {
  it('replaces spaces with hyphens', () => {
    expect(sanitizeFileName('Mi Revista.pdf')).toBe('mi-revista.pdf')
  })

  it('removes special characters', () => {
    expect(sanitizeFileName('revista#2026@final.pdf')).toBe('revista2026final.pdf')
  })

  it('normalizes accented characters by removing non-ascii chars', () => {
    expect(sanitizeFileName('  Informe Clínico 2026.pdf  ')).toBe('informe-clnico-2026.pdf')
  })
})
