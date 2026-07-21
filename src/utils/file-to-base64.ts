/**
 * Convierte un archivo del navegador a base64 sin prefijo data URL
 * @param file - Archivo seleccionado por el usuario
 * @returns {Promise<string>} Contenido en base64
 */
export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = () => {
      const result = reader.result

      if (typeof result !== 'string') {
        reject(new Error('No se pudo leer el archivo.'))
        return
      }

      const base64 = result.split(',')[1]

      if (!base64) {
        reject(new Error('No se pudo convertir el archivo a base64.'))
        return
      }

      resolve(base64)
    }

    reader.onerror = () => {
      reject(new Error('No se pudo leer el archivo PDF.'))
    }

    reader.readAsDataURL(file)
  })
}
