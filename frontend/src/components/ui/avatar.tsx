import type { ImgHTMLAttributes } from 'react'
import { cn } from '../../lib/utils'

export function Avatar({
  className,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      className={cn('size-9 rounded-full object-cover', className)}
      {...props}
    />
  )
}
