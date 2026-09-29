import { useNavigate, Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { AuthLayout } from './AuthLayout'
import { FormError } from './FormError'
import {
  emailVerificationSchema,
  type EmailVerificationValues,
  zodResolver,
} from './schemas'

export function EmailVerificationForm() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmailVerificationValues>({
    resolver: zodResolver(emailVerificationSchema),
    mode: 'onChange',
  })

  const onSubmit = async ({ email }: EmailVerificationValues) => {
    await navigate({ to: '/reset-password', search: { email } })
  }

  return (
    <AuthLayout>
      <section className="max-h-[calc(100dvh-3rem)] overflow-y-auto overscroll-contain rounded-xl border border-white/20 bg-white p-6 text-[#172033] shadow-sm sm:max-h-[calc(100dvh-5rem)] sm:p-8">
        <header className="space-y-2 text-center">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Verify your email
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your account email to continue resetting your password.
          </p>
        </header>

        <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="verification-email">Email</Label>
            <Input
              id="verification-email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              placeholder="m@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={
                errors.email ? 'verification-email-error' : undefined
              }
              {...register('email')}
            />
            <FormError
              id="verification-email-error"
              message={errors.email?.message}
            />
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#4f46a5] text-white hover:bg-[#37327f] disabled:bg-[#4f46a5] disabled:text-white"
          >
            Verify
          </Button>
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
