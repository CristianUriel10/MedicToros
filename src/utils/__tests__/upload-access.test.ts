import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  grantUploadAccessInSession,
  hasUploadAccessInSession,
  isUploadPasswordRequired,
  revokeUploadAccessInSession,
  verifyUploadPassword,
} from '../upload-access'

describe('upload-access', () => {
  afterEach(() => {
    vi.unstubAllEnvs()
    revokeUploadAccessInSession()
  })

  it('allows upload when no password is configured', () => {
    vi.stubEnv('VITE_UPLOAD_PASSWORD', '')

    expect(isUploadPasswordRequired()).toBe(false)
    expect(verifyUploadPassword('anything')).toBe(true)
    expect(hasUploadAccessInSession()).toBe(true)
  })

  it('requires matching password when configured', () => {
    vi.stubEnv('VITE_UPLOAD_PASSWORD', 'editor-secret')

    expect(isUploadPasswordRequired()).toBe(true)
    expect(verifyUploadPassword('wrong')).toBe(false)
    expect(verifyUploadPassword('editor-secret')).toBe(true)
    expect(hasUploadAccessInSession()).toBe(false)

    grantUploadAccessInSession()
    expect(hasUploadAccessInSession()).toBe(true)
  })
})
