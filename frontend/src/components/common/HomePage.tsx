import { CheckCircle2, Layers3, ShieldCheck } from 'lucide-react'
import { Button } from '../ui/button'

export function HomePage() {
  return (
    <main className="bg-background text-foreground min-h-screen px-6 py-12 sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-5xl flex-col gap-16">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-lg">
              <Layers3 aria-hidden="true" className="size-5" />
            </div>
            <span className="font-semibold tracking-tight">
              Mini Issue Tracker
            </span>
          </div>
          <span className="text-muted-foreground text-sm">
            Frontend foundation
          </span>
        </header>
        <section className="max-w-2xl space-y-6">
          <p className="text-primary text-sm font-medium">
            Foundation initialized
          </p>
          <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
            A calm place to build better work.
          </h1>
          <p className="text-muted-foreground max-w-xl text-lg leading-8">
            The frontend foundation is ready for incremental feature development
            with typed routing, server-state caching, accessible UI primitives,
            and a shared visual language.
          </p>
          <Button type="button">Explore the foundation</Button>
        </section>
        <section
          aria-labelledby="foundation-heading"
          className="grid gap-4 sm:grid-cols-3"
        >
          <h2 id="foundation-heading" className="sr-only">
            Included foundations
          </h2>
          {[
            ['Typed navigation', 'TanStack Router owns URL and route state.'],
            [
              'Server state',
              'TanStack Query is ready for API-backed features.',
            ],
            [
              'Accessible UI',
              'Local primitives keep interaction behavior consistent.',
            ],
          ].map(([title, description]) => (
            <article
              className="border-border bg-card rounded-lg border p-5 shadow-sm"
              key={title}
            >
              <CheckCircle2
                aria-hidden="true"
                className="text-success mb-4 size-5"
              />
              <h3 className="font-medium">{title}</h3>
              <p className="text-muted-foreground mt-2 text-sm leading-6">
                {description}
              </p>
            </article>
          ))}
        </section>
        <footer className="text-muted-foreground flex items-center gap-2 text-sm">
          <ShieldCheck aria-hidden="true" className="size-4" />
          Infrastructure first. Features next.
        </footer>
      </div>
    </main>
  )
}
