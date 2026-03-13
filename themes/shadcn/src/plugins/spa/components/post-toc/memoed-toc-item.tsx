import { type ComponentProps, memo, useEffect, useRef } from 'preact/compat'
import { TocItem } from './toc-item'

export const MemoedItem = memo((props: ComponentProps<typeof TocItem>) => {
  const { range, ...rest } = props
  const active = range > 0
  const itemRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!active) return

    const $item = itemRef.current
    if (!$item) return

    const $container = $item.parentElement
    if (!$container) return

    const containerHeight = $container.clientHeight
    const itemHeight = $item.clientHeight
    const itemOffsetTop = $item.offsetTop
    const { scrollTop } = $container

    const itemTop = itemOffsetTop - scrollTop
    const itemBottom = itemTop + itemHeight

    if (itemTop < 0 || itemBottom > containerHeight) {
      $container.scrollTop =
        itemOffsetTop - containerHeight / 2 + itemHeight / 2
    }
  }, [active])

  return <TocItem range={range} {...rest} />
})
