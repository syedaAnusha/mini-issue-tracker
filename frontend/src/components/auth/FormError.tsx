interface FormErrorProps {
  id: string
  message?: string
}

export function FormError({ id, message }: FormErrorProps) {
  if (!message) return null

  return (
    <p id={id} className="text-xs text-[var(--auth-error)]" aria-live="polite">
      {message}
    </p>
  )
}
