interface EmptyStateProps {
  title: string
  description: string
}

export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <section className="border-border rounded-lg border border-dashed p-8 text-center">
      <h2 className="font-medium">{title}</h2>
      <p className="text-muted-foreground mt-2 text-sm">{description}</p>
    </section>
  )
}
