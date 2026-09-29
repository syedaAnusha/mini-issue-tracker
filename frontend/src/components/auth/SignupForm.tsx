import { Link } from '@tanstack/react-router'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { apiClient } from '../../lib/axios'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { AuthLayout } from './AuthLayout'
import { FormError } from './FormError'
import {
  passwordGuidance,
  signupSchema,
  type SignupValues,
  zodResolver,
} from './schemas'

export function SignupForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  })
  const [submitError, setSubmitError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: SignupValues) => {
    setSubmitError(undefined)
    setIsSubmitting(true)
    try {
      await apiClient.post('/auth/signup', values)
    } catch {
      setSubmitError(
        'Unable to create your account right now. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout>
      <section className="max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-xl border border-white/20 bg-white p-6 text-[#172033] shadow-sm sm:max-h-[calc(100dvh-5rem)] sm:p-8">
        <header className="space-y-2 text-center">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your details below to get started
          </p>
        </header>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? 'signup-name-error' : undefined}
              {...register('name')}
            />
            <FormError id="signup-name-error" message={errors.name?.message} />
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="m@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'signup-email-error' : undefined}
              {...register('email')}
            />
            <FormError
              id="signup-email-error"
              message={errors.email?.message}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? 'signup-password-error' : undefined
                }
                {...register('password')}
              />
              <FormError
                id="signup-password-error"
                message={errors.password?.message}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                aria-describedby={
                  errors.confirmPassword
                    ? 'signup-confirm-password-error'
                    : undefined
                }
                {...register('confirmPassword')}
              />
              <FormError
                id="signup-confirm-password-error"
                message={errors.confirmPassword?.message}
              />
            </div>
          </div>
          <p className="text-muted-foreground text-xs">{passwordGuidance}</p>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#4f46a5] text-white hover:bg-[#37327f] disabled:bg-[#4f46a5] disabled:text-white"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Creating Account…' : 'Create Account'}
          </Button>
          <FormError id="signup-submit-error" message={submitError} />
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
    </AuthLayout>
  )
}
