import { cn } from '@/lib/utils'
import { MemoedItem } from './memoed-toc-item'
import type { TocDataItem } from './toc-item'

interface Props {
  className?: string
  toc: TocDataItem[]
  rootDepth: number
  currentScrollRange: [number, number]
  handleScrollTo: (i: number, $el: HTMLElement | null, anchorId: string) => void
}

const WiderTocStyle = {
  width: 200,
} satisfies React.CSSProperties

export const TitleToc = ({
  className,
  toc,
  rootDepth,
  currentScrollRange,
  handleScrollTo,
}: Props) => {
  return (
    <div
      className={cn(
        'group scrollbar-none relative overflow-auto opacity-60 duration-200 group-hover:opacity-100',
        'flex flex-col',
        className,
      )}
      style={WiderTocStyle}
    >
      {toc.map((heading, index) => (
        <MemoedItem
          variant='title-line'
          heading={heading}
          key={heading.anchorId}
          rootDepth={rootDepth}
          onClick={handleScrollTo}
          isScrollOut={index < currentScrollRange[0]}
          range={index === currentScrollRange[0] ? currentScrollRange[1] : 0}
        />
      ))}
    </div>
  )
}
