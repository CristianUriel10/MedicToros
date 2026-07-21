import type { ReactNode } from 'react'

interface SectionLabelProps {
  children: ReactNode
  className?: string
}

/**
 * Etiqueta de sección con línea roja decorativa
 * @param props - Texto de la etiqueta
 * @returns {JSX.Element} Label estilizado
 */
export function SectionLabel({ children, className = '' }: SectionLabelProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <span className="h-px w-8 bg-accent-500" aria-hidden="true" />
      <span className="text-xs font-semibold uppercase tracking-[0.2em] text-accent-500">
        {children}
      </span>
    </div>
  )
}
