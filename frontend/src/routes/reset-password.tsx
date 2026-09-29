import { createFileRoute } from '@tanstack/react-router'
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm'

export const Route = createFileRoute('/reset-password')({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === 'string' ? search.email : '',
  }),
  component: ForgotPasswordForm,
})
