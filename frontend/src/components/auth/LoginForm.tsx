import { Link } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { AuthLayout } from './AuthLayout'
import { loginSchema, type LoginValues, zodResolver } from './schemas'

export function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  })

  return (
    <AuthLayout>
      <section className="rounded-xl border border-white/20 bg-white p-6 text-[#172033] shadow-sm sm:p-8">
        <header className="space-y-2 text-center">
          <h1 className="text-foreground text-2xl font-semibold tracking-tight">
            Welcome back to DevTracker
          </h1>
          <p className="text-muted-foreground text-sm">
            Login into your account
          </p>
        </header>

        <form
          className="mt-8 space-y-5"
          onSubmit={handleSubmit(() => undefined)}
        >
          <div className="space-y-2">
            <Label htmlFor="login-email">Email</Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              placeholder="m@example.com"
              aria-invalid={Boolean(errors.email)}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-(--auth-error)] text-xs">
                {errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-4">
              <Label htmlFor="login-password">Password</Label>
              <Link
                to="/forgot-password"
                className="text-primary text-sm underline-offset-4 hover:underline"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              aria-invalid={Boolean(errors.password)}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-xs text-(--auth-error)">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full cursor-pointer bg-[#4f46a5] text-white hover:bg-[#37327f] disabled:bg-[#4f46a5] disabled:text-white"
            disabled={!isValid}
          >
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
    </AuthLayout>
  )
}
