import { cn } from '@/lib/utils'
import type { TocDataItem } from './toc-item'

interface Props {
  show: boolean
  toc: TocDataItem[]
  rootDepth: number
  currentScrollRange: [number, number]
  onScrollToButtonClick: (
    i: number,
    $el: HTMLElement | null,
    anchorId: string,
  ) => void
  onMouseLeave: () => void
}

export function HoverCard({
  show,
  toc,
  rootDepth,
  currentScrollRange,
  onScrollToButtonClick,
  onMouseLeave,
}: Props) {
  return (
    <ul
      className={cn(
        'fixed top-24 right-0 z-1000 -mt-1 rounded-2xl border',
        'px-4 py-2 text-xs',
        'bg-background shadow-context-menu backdrop-blur-background',
        'scrollbar-none max-h-[calc(100svh-4rem)] max-w-xs overflow-auto',
        'transition-all duration-200 ease-in-out',
        show
          ? 'pointer-events-auto translate-x-0 opacity-100'
          : 'pointer-events-none translate-x-2 opacity-0',
      )}
      onMouseLeave={onMouseLeave}
    >
      {toc.map((heading, index) => (
        <li
          key={heading.anchorId}
          className='flex w-full items-center'
          style={{
            paddingLeft: `${(heading.depth - rootDepth) * 12}px`,
          }}
        >
          <button
            className={cn(
              'group flex w-full justify-between py-1 text-muted-foreground',
              index === currentScrollRange[0] ? 'text-foreground' : '',
            )}
            type='button'
            onClick={() => {
              onScrollToButtonClick(index, heading.$heading, heading.anchorId)
            }}
          >
            <span className='max-w-prose select-none truncate duration-200 group-hover:text-foreground/80'>
              {heading.title}
            </span>
            <span className='ml-4 select-none text-[8px] opacity-50'>
              H{heading.depth}
            </span>
          </button>
        </li>
      ))}
    </ul>
  )
}
