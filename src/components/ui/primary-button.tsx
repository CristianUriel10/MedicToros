import type { ReactNode } from 'react'

interface PrimaryButtonProps {
  children: ReactNode
  href?: string
  type?: 'button' | 'submit'
  disabled?: boolean
  onClick?: () => void
  className?: string
}

/**
 * Botón principal rojo con flecha del diseño MedicToros
 * @param props - Contenido y acción del botón
 * @returns {JSX.Element} CTA estilizado
 */
export function PrimaryButton({
  children,
  href,
  type = 'button',
  disabled = false,
  onClick,
  className = '',
}: PrimaryButtonProps) {
  const styles = `inline-flex items-center gap-2 bg-accent-500 px-6 py-3 text-xs font-semibold uppercase tracking-[0.15em] text-white transition-colors hover:bg-accent-600 disabled:cursor-not-allowed disabled:opacity-60 ${className}`

  if (href) {
    return (
      <a href={href} className={styles}>
        {children}
        <span aria-hidden="true">→</span>
      </a>
    )
  }

  return (
    <button type={type} disabled={disabled} onClick={onClick} className={styles}>
      {children}
      <span aria-hidden="true">→</span>
    </button>
  )
}
