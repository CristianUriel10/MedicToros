import { useCallback, useState } from 'react'
import {
  grantUploadAccessInSession,
  hasUploadAccessInSession,
  isUploadPasswordRequired,
  revokeUploadAccessInSession,
  verifyUploadPassword,
} from '../utils/upload-access'

interface UseUploadAccessResult {
  isUploadPasswordRequired: boolean
  isUploadUnlocked: boolean
  unlockUpload: (password: string) => boolean
  lockUpload: () => void
}

/**
 * Hook para controlar el acceso protegido al formulario de subida
 * @returns {UseUploadAccessResult} Estado y acciones de acceso
 */
export function useUploadAccess(): UseUploadAccessResult {
  const [isUploadUnlocked, setIsUploadUnlocked] = useState(hasUploadAccessInSession)
  const uploadPasswordRequired = isUploadPasswordRequired()

  const unlockUpload = useCallback((password: string) => {
    if (!uploadPasswordRequired) {
      setIsUploadUnlocked(true)
      return true
    }

    if (!verifyUploadPassword(password)) {
      return false
    }

    grantUploadAccessInSession()
    setIsUploadUnlocked(true)
    return true
  }, [uploadPasswordRequired])

  const lockUpload = useCallback(() => {
    revokeUploadAccessInSession()
    setIsUploadUnlocked(false)
  }, [])

  return {
    isUploadPasswordRequired: uploadPasswordRequired,
    isUploadUnlocked,
    unlockUpload,
    lockUpload,
  }
}
