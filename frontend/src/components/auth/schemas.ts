import type { Resolver } from 'react-hook-form'
import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters long.')
  .regex(/[a-zA-Z]/, 'Password must include at least one letter.')
  .regex(/[A-Z]/, 'Password must include at least one uppercase letter.')
  .regex(/[0-9]/, 'Password must include at least one number.')
  .regex(/[^a-zA-Z0-9]/, 'Password must include at least one symbol.')

const passwordPair = {
  password: passwordSchema,
  confirmPassword: z.string().min(1, 'Please confirm your password.'),
}

const withMatchingPasswords = <T extends z.ZodRawShape>(shape: T) => {
  const schema = z.object({ ...shape, ...passwordPair })
  return schema.refine(
    (values) => {
      const passwordValues = values as {
        password: string
        confirmPassword: string
      }
      return passwordValues.password === passwordValues.confirmPassword
    },
    {
      message: 'Passwords do not match.',
      path: ['confirmPassword'],
    },
  )
}

export const loginSchema = z.object({
  email: z.email('Enter a valid email address.'),
  password: z.string().min(1, 'Password is required.'),
})

export const emailVerificationSchema = z.object({
  email: z.email('Enter a valid email address.'),
})

export const signupSchema = withMatchingPasswords({
  name: z
    .string()
    .trim()
    .min(1, 'Full name is required.')
    .max(18, 'Full name must be 18 characters or fewer.'),
  email: z.email('Enter a valid email address.'),
})

export const forgotPasswordSchema = withMatchingPasswords({
  email: z.email('Enter a valid email address.'),
})

export const resetPasswordSchema = withMatchingPasswords({})

export type LoginValues = z.infer<typeof loginSchema>
export type EmailVerificationValues = z.infer<typeof emailVerificationSchema>
export type SignupValues = z.infer<typeof signupSchema>
export type ForgotPasswordValues = z.infer<typeof forgotPasswordSchema>
export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

export const passwordGuidance =
  'Use at least 8 characters with an uppercase letter, number, and symbol.'

export function zodResolver<T extends z.ZodType>(
  schema: T,
): Resolver<z.infer<T>> {
  return async (values) => {
    const result = await schema.safeParseAsync(values)

    if (result.success) {
      return { values: result.data, errors: {} }
    }

    const errors = result.error.issues.reduce<
      Record<string, { type: string; message: string }>
    >((fieldErrors, issue) => {
      const fieldName = issue.path.join('.')
      if (!fieldErrors[fieldName]) {
        fieldErrors[fieldName] = {
          type: issue.code,
          message: issue.message,
        }
      }
      return fieldErrors
    }, {})

    return { values: {}, errors }
  }
}
