import { memo, useMemo } from 'preact/compat'
import { useScrollTracking } from './hooks/use-scroll-tracking'
import { useTocItems } from './hooks/use-toc-items'
import { LineToc } from './line-toc'

export const PostToc = memo(() => {
  const markdownElement = useMemo(
    () => document.getElementById('cnblogs_post_body') as HTMLElement,
    [],
  )
  const { toc, rootDepth } = useTocItems(markdownElement)
  const { currentScrollRange, handleScrollTo } = useScrollTracking(toc)

  if (toc.length === 0) {
    return null
  }

  return (
    <div className="fixed top-24 right-0 z-1000 hidden md:block">
      <LineToc
        toc={toc}
        rootDepth={rootDepth}
        currentScrollRange={currentScrollRange}
        handleScrollTo={handleScrollTo}
      />
    </div>
  )
})
