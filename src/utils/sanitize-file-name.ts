/**
 * Limpia el nombre de archivo para usarlo en Firebase Storage
 * @param fileName - Nombre original del archivo
 * @returns {string} Nombre seguro para rutas de almacenamiento
 */
export function sanitizeFileName(fileName: string): string {
  return fileName
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9._-]/g, '')
    .toLowerCase()
}
