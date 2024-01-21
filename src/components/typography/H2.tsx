import { cn } from '@/lib/utils'
import { HTMLAttributes, ReactNode } from 'react'

interface Props extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode
}

export function H2({ className, children, ...props }: Props) {
  return (
    <h2
      className={cn(
        'scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...props}
    >
      {children}
    </h2>
  )
}
