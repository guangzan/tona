import { useCallback, useEffect, useMemo, useState } from 'preact/hooks'
import type { TocDataItem } from '../toc-item'

export const useTocItems = (markdownElement: HTMLElement | null) => {
  const queryToCItems = useCallback(
    (): HTMLHeadingElement[] =>
      Array.from(
        markdownElement?.querySelectorAll('h1, h2, h3, h4, h5, h6') || [],
      ),
    [markdownElement],
  )

  const [$headings, setHeadings] = useState(queryToCItems)

  useEffect(() => {
    setHeadings(queryToCItems())
  }, [queryToCItems])

  const toc: TocDataItem[] = useMemo(
    () =>
      Array.from($headings).map((el, idx) => {
        const depth = +el.tagName.slice(1)
        const elClone = el.cloneNode(true) as HTMLElement
        const title = elClone.textContent || ''
        const index = idx

        return {
          depth,
          index: Number.isNaN(index) ? -1 : index,
          title,
          anchorId: el.dataset.rid || '',
          $heading: el,
        }
      }),
    [$headings],
  )

  const rootDepth = useMemo(
    () =>
      toc?.length
        ? (toc.reduce(
            (d: number, cur) => Math.min(d, cur.depth),
            toc[0]?.depth || 0,
          ) as any as number)
        : 0,
    [toc],
  )

  const refreshItems = useCallback(() => {
    setHeadings(queryToCItems())
  }, [queryToCItems])

  return {
    toc,
    rootDepth,
    refreshItems,
  }
}
