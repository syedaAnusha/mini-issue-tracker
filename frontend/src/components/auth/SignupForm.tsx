import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { AuthLayout } from './AuthLayout'
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
    formState: { errors, isValid },
  } = useForm<SignupValues>({
    resolver: zodResolver(signupSchema),
    mode: 'onChange',
  })

  return (
    <AuthLayout>
      <section className="rounded-xl border border-white/20 bg-white p-6 text-[#172033] shadow-sm sm:p-8">
        <header className="space-y-2 text-center">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Create your account
          </h1>
          <p className="text-muted-foreground text-sm">
            Enter your details below to get started
          </p>
        </header>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit(() => undefined)}
        >
          <div className="space-y-2">
            <Label htmlFor="signup-name">Full Name</Label>
            <Input
              id="signup-name"
              type="text"
              autoComplete="name"
              placeholder="John Doe"
              aria-invalid={Boolean(errors.name)}
              {...register('name')}
            />
            {errors.name && (
              <p className="text-xs text-[var(--auth-error)]">
                {errors.name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="signup-email">Email</Label>
            <Input
              id="signup-email"
              type="email"
              autoComplete="email"
              placeholder="m@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-xs text-[var(--auth-error)]">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="signup-password">Password</Label>
              <Input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.password)}
                {...register('password')}
              />
              {errors.password && (
                <p className="text-xs text-[var(--auth-error)]">
                  {errors.password.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm Password</Label>
              <Input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                aria-invalid={Boolean(errors.confirmPassword)}
                {...register('confirmPassword')}
              />
              {errors.confirmPassword && (
                <p className="text-xs text-[var(--auth-error)]">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
          </div>
          <p className="text-muted-foreground text-xs">{passwordGuidance}</p>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#4f46a5] text-white hover:bg-[#37327f] disabled:bg-[#4f46a5] disabled:text-white"
            disabled={!isValid}
          >
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
    </AuthLayout>
  )
}
