export const brandAssets = {
  bull: '/assets/logo-bull.png',
  wordmark: '/assets/logo-wordmark.png',
} as const

export type LogoVariant = keyof typeof brandAssets
export type LogoSurface = 'dark' | 'light'

interface BrandLogoProps {
  variant: LogoVariant
  surface?: LogoSurface
  className?: string
  alt?: string
}

const defaultAlt: Record<LogoVariant, string> = {
  bull: 'MedicToros - Logo del toro médico',
  wordmark: 'MedicToros - Revista de investigación médica',
}

/**
 * Renderiza el logo de marca con contraste adaptado al fondo
 * @param props - Variante, superficie y clases del logo
 * @returns {JSX.Element} Imagen del logo optimizada para el fondo
 */
export function BrandLogo({
  variant,
  surface = 'dark',
  className = '',
  alt,
}: BrandLogoProps) {
  const imageAlt = alt ?? defaultAlt[variant]

  if (variant === 'wordmark') {
    if (surface === 'dark') {
      return (
        <span className="inline-flex rounded-sm bg-white px-3 py-1.5 shadow-sm ring-1 ring-white/40">
          <img
            src={brandAssets.wordmark}
            alt={imageAlt}
            className={`h-8 w-auto object-contain md:h-9 ${className}`}
          />
        </span>
      )
    }

    return (
      <img
        src={brandAssets.wordmark}
        alt={imageAlt}
        className={`h-8 w-auto object-contain md:h-9 ${className}`}
      />
    )
  }

  const bullClasses =
    surface === 'dark'
      ? `object-contain mix-blend-screen ${className}`
      : `object-contain ${className}`

  return <img src={brandAssets.bull} alt={imageAlt} className={bullClasses} />
}
