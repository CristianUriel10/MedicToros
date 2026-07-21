/**
 * Solicita confirmación antes de eliminar una publicación
 * @param title - Título visible de la publicación
 * @returns {boolean} true si el usuario confirma la eliminación
 */
export function confirmDeletePublication(title: string): boolean {
  return window.confirm(
    `¿Eliminar "${title}"?\n\nEsta acción borrará el PDF y sus metadatos. No se puede deshacer.`,
  )
}
