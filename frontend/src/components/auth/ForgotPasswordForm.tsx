import { Link } from '@tanstack/react-router'
import { useSearch } from '@tanstack/react-router'
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
  resetPasswordSchema,
  type ResetPasswordValues,
  zodResolver,
} from './schemas'

export function ForgotPasswordForm() {
  const { email } = useSearch({ from: '/reset-password' })
  const [submitError, setSubmitError] = useState<string>()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    mode: 'onChange',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async (values: ResetPasswordValues) => {
    setSubmitError(undefined)
    setIsSubmitting(true)
    try {
      await apiClient.post('/auth/reset-password', { ...values, email })
    } catch {
      setSubmitError(
        'Unable to reset your password right now. Please try again.',
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!email) {
    return (
      <AuthLayout>
        <section className="max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-xl border border-white/20 bg-white p-6 text-[#172033] shadow-sm sm:max-h-[calc(100dvh-5rem)] sm:p-8">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Verification required
          </h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Verify your email before creating a new password.
          </p>
          <Link
            to="/forgot-password"
            className="text-primary mt-6 inline-block font-medium underline-offset-4 hover:underline"
          >
            Verify email
          </Link>
        </section>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout>
      <section className="max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-xl border border-white/20 bg-white p-6 text-[#172033] shadow-sm sm:max-h-[calc(100dvh-5rem)] sm:p-8">
        <header className="space-y-2 text-center">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Create a new password
          </h1>
          <p className="text-muted-foreground text-sm">
            Choose a new password for {email}
          </p>
        </header>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="forgot-password">New Password</Label>
            <Input
              id="forgot-password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? 'forgot-password-error' : undefined
              }
              {...register('password')}
            />
            <FormError
              id="forgot-password-error"
              message={errors.password?.message}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="forgot-confirm-password">Confirm Password</Label>
            <Input
              id="forgot-confirm-password"
              type="password"
              autoComplete="new-password"
              aria-invalid={Boolean(errors.confirmPassword)}
              aria-describedby={
                errors.confirmPassword
                  ? 'forgot-confirm-password-error'
                  : undefined
              }
              {...register('confirmPassword')}
            />
            <FormError
              id="forgot-confirm-password-error"
              message={errors.confirmPassword?.message}
            />
          </div>
          <p className="text-muted-foreground text-xs">{passwordGuidance}</p>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#4f46a5] text-white hover:bg-[#37327f] disabled:bg-[#4f46a5] disabled:text-white"
            disabled={isSubmitting}
            aria-busy={isSubmitting}
          >
            {isSubmitting ? 'Resetting Password…' : 'Reset Password'}
          </Button>
          <FormError id="forgot-submit-error" message={submitError} />
        </form>

        <p className="text-muted-foreground mt-6 text-center text-sm">
          Remembered your password?{' '}
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
