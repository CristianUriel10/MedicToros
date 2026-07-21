/**
 * Convierte bytes a una cadena legible (KB o MB)
 * @param bytes - Tamaño del archivo en bytes
 * @returns {string} Tamaño formateado
 */
export function formatFileSize(bytes: number): string {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`
  }

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}
