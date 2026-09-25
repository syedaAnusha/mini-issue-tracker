import type { HTMLAttributes } from 'react'

export function Separator(props: HTMLAttributes<HTMLHRElement>) {
  return (
    <hr aria-orientation="horizontal" className="border-border" {...props} />
  )
}
