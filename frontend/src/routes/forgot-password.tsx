import { createFileRoute } from '@tanstack/react-router'
import { ForgotPasswordForm } from '../components/auth/ForgotPasswordForm'

export const Route = createFileRoute('/forgot-password')({
  component: ForgotPasswordForm,
})
