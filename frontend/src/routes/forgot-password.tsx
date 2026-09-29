import { createFileRoute } from '@tanstack/react-router'
import { EmailVerificationForm } from '../components/auth/EmailVerificationForm'

export const Route = createFileRoute('/forgot-password')({
  component: EmailVerificationForm,
})
