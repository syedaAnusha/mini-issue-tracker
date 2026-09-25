import type { InputHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Input({
  className,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        'border-input bg-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm outline-none focus-visible:ring-2',
        className,
      )}
      {...props}
    />
  )
}
