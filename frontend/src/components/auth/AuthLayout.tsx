import type { ReactNode } from 'react'

interface AuthLayoutProps {
  children: ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <main className="bg-primary text-primary-foreground flex min-h-dvh items-center justify-center overflow-hidden px-4 py-6 sm:px-6 sm:py-10">
      <div className="w-full max-w-md self-center">{children}</div>
    </main>
  )
}
