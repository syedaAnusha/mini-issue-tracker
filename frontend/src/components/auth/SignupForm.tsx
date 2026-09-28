import type { FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { AuthLayout } from './AuthLayout'

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
}

export function SignupForm() {
  return (
    <AuthLayout>
      <section className="border-border bg-card text-card-foreground rounded-xl border p-6 shadow-sm sm:p-8">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your details below to get started
          </p>
        </header>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input
              id="signup-name"
              name="name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
          </div>

          <p className="text-muted-foreground text-xs">
            Passwords must be at least 8 characters long.
          </p>

          <Button type="submit" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Already have an account?{' '}
          <Link
            to="/"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </p>
      </section>

      <p className="text-muted-foreground px-4 pt-5 text-center text-xs leading-5">
        By clicking continue, you agree to our{' '}
        <a
          href="#terms"
          className="text-foreground underline underline-offset-4"
        >
          Terms of Service
        </a>{' '}
        and{' '}
        <a
          href="#privacy"
          className="text-foreground underline underline-offset-4"
        >
          Privacy Policy
        </a>
        .
      </p>
    </AuthLayout>
  )
}
