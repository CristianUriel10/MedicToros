const UPLOAD_ACCESS_STORAGE_KEY = 'medictoros-upload-access'

/**
 * Indica si la subida requiere contraseña según variables de entorno
 * @returns {boolean} true si hay contraseña configurada
 */
export function isUploadPasswordRequired(): boolean {
  return Boolean(import.meta.env.VITE_UPLOAD_PASSWORD?.trim())
}

/**
 * Valida la contraseña de subida contra la variable de entorno
 * @param password - Contraseña ingresada por el editor
 * @returns {boolean} true si coincide con la contraseña configurada
 */
export function verifyUploadPassword(password: string): boolean {
  const expectedPassword = import.meta.env.VITE_UPLOAD_PASSWORD?.trim() ?? ''

  if (!expectedPassword) {
    return true
  }

  return password === expectedPassword
}

/**
 * Verifica si la sesión actual ya desbloqueó la subida
 * @returns {boolean} true si el editor ya ingresó la contraseña
 */
export function hasUploadAccessInSession(): boolean {
  if (!isUploadPasswordRequired()) {
    return true
  }

  return sessionStorage.getItem(UPLOAD_ACCESS_STORAGE_KEY) === 'granted'
}

/**
 * Marca la sesión como autorizada para subir artículos
 */
export function grantUploadAccessInSession(): void {
  sessionStorage.setItem(UPLOAD_ACCESS_STORAGE_KEY, 'granted')
}

/**
 * Revoca el acceso de subida en la sesión actual
 */
export function revokeUploadAccessInSession(): void {
  sessionStorage.removeItem(UPLOAD_ACCESS_STORAGE_KEY)
}
