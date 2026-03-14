import { cn } from '@/lib/utils'
import { BackTopIndicator } from './back-top-indicator'
import { MemoedItem } from './memoed-toc-item'
import type { TocDataItem } from './toc-item'

interface Props {
  className?: string
  toc: TocDataItem[]
  rootDepth: number
  currentScrollRange: [number, number]
  onMouseEnter: () => void
  onMouseLeave: () => void
  onScrollTo: (i: number, $el: HTMLElement | null, anchorId: string) => void
}

export function LineTocCard({
  className,
  toc,
  rootDepth,
  currentScrollRange,
  onMouseEnter,
  onMouseLeave,
  onScrollTo,
}: Props) {
  return (
    <div
      className={cn(
        'fade-in-0 slide-in-from-bottom-4 easing-spring spring-soft animate-in',
        'flex flex-col',
        className,
      )}
    >
      <div
        className={cn(
          'flex flex-col items-end',
          'scrollbar-none max-h-[calc(100vh-200px)] overflow-auto',
          '@[700px]:-translate-x-12 @[800px]:-translate-x-4 @[900px]:translate-x-0 @[900px]:items-start',
          'group scrollbar-none overflow-auto opacity-60 duration-200 group-hover:opacity-100',
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        {toc.map((heading, index) => (
          <MemoedItem
            variant="line"
            heading={heading}
            key={heading.anchorId}
            rootDepth={rootDepth}
            onClick={onScrollTo}
            isScrollOut={index < currentScrollRange[0]}
            range={index === currentScrollRange[0] ? currentScrollRange[1] : 0}
          />
        ))}
      </div>
      <BackTopIndicator />
    </div>
  )
}
