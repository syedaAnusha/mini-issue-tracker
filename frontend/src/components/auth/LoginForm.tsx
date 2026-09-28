import type { FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { AuthLayout } from './AuthLayout'

function handleSubmit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
}

export function LoginForm() {
  return (
    <AuthLayout>
      <section className="border-border bg-card text-card-foreground rounded-xl border p-6 shadow-sm sm:p-8">
        <header className="space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-muted-foreground text-sm">
            Login with your Apple or Google account
          </p>
        </header>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <Button type="button" variant="outline" className="w-full">
              <span aria-hidden="true" className="text-base font-semibold">
                A
              </span>
              Login with Apple
            </Button>
            <Button type="button" variant="outline" className="w-full">
              <span aria-hidden="true" className="text-base font-semibold">
                G
              </span>
              Login with Google
            </Button>
          </div>

          <div className="text-muted-foreground flex items-center gap-3 text-xs">
            <span aria-hidden="true" className="bg-border h-px flex-1" />
            <span>Or continue with email</span>
            <span aria-hidden="true" className="bg-border h-px flex-1" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="m@example.com"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="login-password">Password</Label>
              <a
                href="#forgot-password"
                className="text-primary text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </a>
            </div>
            <Input
              id="login-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>

          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link
            to="/signup"
            className="text-primary font-medium underline-offset-4 hover:underline"
          >
            Sign up
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
