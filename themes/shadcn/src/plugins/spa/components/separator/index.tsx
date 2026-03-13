import { cn } from '@/lib/utils'

interface SeparatorProps {
  className?: string
  plain?: boolean
}

export function Separator({ className, plain }: SeparatorProps) {
  return (
    <div
      className={cn(
        'relative flex h-8 w-full border-edge border-x',
        !plain && [
          'before:absolute before:-left-[100vw] before:-z-1 before:h-8 before:w-[200vw]',
          'before:bg-[repeating-linear-gradient(315deg,var(--pattern-foreground)_0,var(--pattern-foreground)_1px,transparent_0,transparent_50%)] before:bg-size-[10px_10px] before:[--pattern-foreground:var(--color-edge)]/56',
        ],
        className,
      )}
    />
  )
}
