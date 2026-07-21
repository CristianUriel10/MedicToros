import { categoryGradients, defaultGradient } from '../../data/visual-theme'

interface PublicationCoverProps {
  category: string
  label?: string
  className?: string
}

/**
 * Portada local con gradiente cuando no hay imagen externa
 * @param props - Categoría y clases del contenedor
 * @returns {JSX.Element} Portada visual de la publicación
 */
export function PublicationCover({ category, label, className = '' }: PublicationCoverProps) {
  const gradient = categoryGradients[category] ?? defaultGradient

  return (
    <div
      className={`relative flex aspect-[4/3] items-end overflow-hidden bg-gradient-to-br ${gradient} p-5 ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'url(/assets/logo-bull.png)',
          backgroundSize: '180px',
          backgroundPosition: 'right top',
          backgroundRepeat: 'no-repeat',
        }}
        aria-hidden="true"
      />
      {label && (
        <span className="relative text-[10px] font-semibold uppercase tracking-[0.2em] text-white/80">
          {label}
        </span>
      )}
    </div>
  )
}
