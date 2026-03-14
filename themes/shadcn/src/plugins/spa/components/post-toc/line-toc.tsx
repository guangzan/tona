import { useRef, useState } from 'preact/hooks'
import { useLocalStorage } from 'tona-hooks'
import { cn } from '@/lib/utils'
import { HoverCard } from './hover-card'
import { LineTocCard } from './line-toc-card'
import type { TocDataItem } from './toc-item'

interface Props {
  toc: TocDataItem[]
  rootDepth: number
  currentScrollRange: [number, number]
  handleScrollTo: (i: number, $el: HTMLElement | null, anchorId: string) => void
}

export const LineToc = ({
  toc,
  rootDepth,
  currentScrollRange,
  handleScrollTo,
}: Props) => {
  const [hoverShow, setHoverShow] = useState(false)
  const [pinned, setPinned] = useLocalStorage<boolean>(
    '_tona_theme-shadcn-post-toc-pinned',
    false,
  )
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const shouldHoverCardVisible = pinned || hoverShow

  const handleMouseEnter = () => {
    hoverTimerRef.current = setTimeout(() => setHoverShow(true), 800)
  }

  const handleMouseLeave = () => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current)
      hoverTimerRef.current = null
    }
  }

  const handlePinToggle = () => {
    setPinned(!pinned)
  }

  return (
    <div className="flex grow flex-col px-2">
      {shouldHoverCardVisible ? (
        <HoverCard
          pinned={!!pinned}
          toc={toc}
          rootDepth={rootDepth}
          currentScrollRange={currentScrollRange}
          onScrollToButtonClick={handleScrollTo}
          onMouseLeave={() => !pinned && setHoverShow(false)}
          onPinToggle={handlePinToggle}
        />
      ) : (
        <LineTocCard
          toc={toc}
          rootDepth={rootDepth}
          currentScrollRange={currentScrollRange}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onScrollTo={handleScrollTo}
        />
      )}
    </div>
  )
}
