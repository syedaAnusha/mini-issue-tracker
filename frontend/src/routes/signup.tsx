import { createFileRoute } from '@tanstack/react-router'
import { SignupForm } from '../components/auth/SignupForm'

export const Route = createFileRoute('/signup')({ component: SignupForm })
