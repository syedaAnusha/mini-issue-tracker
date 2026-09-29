import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiClient } from '../../lib/axios'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { AuthLayout } from './AuthLayout'
import { FormError } from './FormError'
import { loginSchema, type LoginValues, zodResolver } from './schemas'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })
  const [submitError, setSubmitError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: LoginValues) => {
    setSubmitError(undefined)
    setIsSubmitting(true)
    try {
      await apiClient.post('/auth/login', values)
    } catch {
      setSubmitError('Unable to sign in right now. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <section className="max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-xl border border-white/20 bg-white p-6 text-[#172033] shadow-sm sm:max-h-[calc(100dvh-5rem)] sm:p-8">
        <header className="space-y-2 text-center">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Welcome back to DevTracker
          </h1>
          <p className="text-muted-foreground text-sm">
            Log in to your account
          </p>
        </header>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="m@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'login-email-error' : undefined}
              {...register('email')}
            />
            <FormError id="login-email-error" message={errors.email?.message} />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="login-password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-primary text-sm font-medium underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? 'login-password-error' : undefined
              }
              {...register('password')}
            />
            <FormError
              id="login-password-error"
              message={errors.password?.message}
            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#4f46a5] text-white hover:bg-[#37327f] disabled:bg-[#4f46a5] disabled:text-white"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Signing in…' : 'Log In'}
          </Button>
          <FormError id="login-submit-error" message={submitError} />
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
    </AuthLayout>
  )
}
