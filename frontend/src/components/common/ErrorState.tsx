interface ErrorStateProps {
  title?: string
  description: string
  onRetry?: () => void
}

export function ErrorState({
  title = 'Something went wrong',
  description,
  onRetry,
}: ErrorStateProps) {
  return (
    <section
      role="alert"
      className="border-destructive/30 bg-destructive/5 rounded-lg border p-6"
    >
      <h2 className="font-medium">{title}</h2>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
      {onRetry ? (
        <button
          className="text-primary mt-4 text-sm font-medium underline"
          onClick={onRetry}
          type="button"
        >
          Try again
        </button>
      ) : null}
    </section>
  )
}
