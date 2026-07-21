import type { FormEvent } from 'react'
import { PrimaryButton } from '../ui/primary-button'
import { submissionInputClassName } from './submission-form-styles'

interface SubmissionAccessFormProps {
  editorPassword: string
  accessErrorMessage: string
  onPasswordChange: (value: string) => void
  onSubmit: (event: FormEvent<HTMLFormElement>) => void
  onCancel: () => void
}

/**
 * Formulario de contraseña editorial para desbloquear subida y eliminación
 * @param props - Estado y callbacks del acceso editorial
 * @returns {JSX.Element} Formulario de acceso
 */
export function SubmissionAccessForm({
  editorPassword,
  accessErrorMessage,
  onPasswordChange,
  onSubmit,
  onCancel,
}: SubmissionAccessFormProps) {
  return (
    <form className="mt-8 space-y-4" onSubmit={onSubmit}>
      <p className="text-sm text-white/70">
        Esta sección es solo para el equipo editorial. Ingresa la contraseña para
        subir o eliminar publicaciones.
      </p>
      <input
        type="password"
        required
        autoComplete="current-password"
        placeholder="Contraseña editorial *"
        value={editorPassword}
        onChange={(event) => onPasswordChange(event.target.value)}
        className={submissionInputClassName}
      />
      {accessErrorMessage && (
        <p className="text-sm text-accent-500" role="alert">
          {accessErrorMessage}
        </p>
      )}
      <div className="flex flex-wrap gap-3">
        <PrimaryButton type="submit">Acceder al panel editorial</PrimaryButton>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-sm border border-white/20 px-4 py-3 text-xs font-semibold uppercase tracking-wider text-white/80 transition-colors hover:border-white/40 hover:text-white"
        >
          Cancelar
        </button>
      </div>
    </form>
  )
}
