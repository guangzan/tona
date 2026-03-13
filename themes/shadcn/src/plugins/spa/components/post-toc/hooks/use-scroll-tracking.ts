import { throttle } from 'es-toolkit'
import type { DebouncedFuncLeading } from 'node_modules/es-toolkit/dist/compat/function/debounce.d.mts'
import { useEffect, useLayoutEffect, useRef, useState } from 'preact/hooks'
import { useEventCallback } from 'tona-hooks'
import type { TocDataItem } from '../toc-item'

function getElementTop(element: HTMLElement) {
  let actualTop = element.offsetTop
  let current = element.offsetParent as HTMLElement
  while (current !== null) {
    actualTop += current.offsetTop
    current = current.offsetParent as HTMLElement
  }
  return actualTop
}

function springScrollToElement(element: HTMLElement, offset: number) {
  return new Promise<void>((resolve) => {
    window.scrollTo({
      top: element.offsetTop + offset,
      behavior: 'smooth',
    })
    resolve()
  })
}

/**
 * 计算当前活跃的标题索引
 * 使用视口顶部偏移一定距离作为激活线
 */
function findActiveHeadingIndex(
  headingTops: number[],
  scrollTop: number,
  activationOffset: number,
): number {
  const activationLine = scrollTop + activationOffset

  for (let i = headingTops.length - 1; i >= 0; i--) {
    if (activationLine >= headingTops[i]!) {
      return i
    }
  }

  return -1
}

/**
 * 计算标题的阅读进度 (0-1)
 * 进度基于滚动位置相对于标题范围的相对位置
 */
function calculateProgress(
  scrollTop: number,
  headingTop: number,
  rangeEnd: number,
): number {
  const total = rangeEnd - headingTop

  if (total <= 0) {
    return 0
  }

  // 计算当前滚动位置相对于标题范围的进度
  const current = scrollTop - headingTop
  const progress = current / total

  return Math.min(1, Math.max(0, progress))
}

export const useScrollTracking = (toc: TocDataItem[]) => {
  const [currentScrollRange, setCurrentScrollRange] = useState<
    [number, number]
  >([-1, 0])

  const headingTopsRef = useRef<number[]>([])
  const throttleCallerRef = useRef<
    DebouncedFuncLeading<() => void> | undefined
  >(undefined)

  // 更新标题顶部位置
  useLayoutEffect(() => {
    if (toc.length === 0) {
      headingTopsRef.current = []
      return
    }

    headingTopsRef.current = toc.map(({ $heading }) => getElementTop($heading))
  }, [toc])

  useEffect(() => {
    if (toc.length === 0) {
      return
    }

    const handler = throttle(() => {
      const headingTops = headingTopsRef.current
      const markdownElement = document.getElementById(
        'cnblogs_post_body',
      ) as HTMLElement

      if (headingTops.length === 0) {
        return
      }

      if (!markdownElement) {
        setCurrentScrollRange([-1, 0])
        return
      }

      const scrollTop = window.scrollY || document.documentElement.scrollTop
      // const winHeight = window.innerHeight

      // 使用视口高度的 1/3 作为激活偏移量
      // 当标题到达视口这个位置时，认为该标题处于活跃状态
      const activationOffset = 0 // winHeight / 3
      const activeIndex = findActiveHeadingIndex(
        headingTops,
        scrollTop,
        activationOffset,
      )

      if (activeIndex === -1) {
        setCurrentScrollRange([-1, 0])
        return
      }

      const currentHeadingTop = headingTops[activeIndex]!
      let progress: number

      if (activeIndex === headingTops.length - 1) {
        // 最后一个标题：进度范围从当前标题到文章容器底部
        const markdownContainerTop = getElementTop(markdownElement)
        const markdownContainerBottom =
          markdownContainerTop + markdownElement.offsetHeight
        const rangeEnd = markdownContainerBottom

        progress = calculateProgress(scrollTop, currentHeadingTop, rangeEnd)
      } else {
        // 非最后一个标题：进度范围从当前标题到下一个标题
        const nextHeadingTop = headingTops[activeIndex + 1]!
        progress = calculateProgress(
          scrollTop,
          currentHeadingTop,
          nextHeadingTop,
        )
      }

      setCurrentScrollRange([activeIndex, progress])
    }, 100)

    throttleCallerRef.current = handler

    // 初始化时执行一次
    handler()

    window.addEventListener('scroll', handler, {
      passive: true,
    })

    return () => {
      window.removeEventListener('scroll', handler)
      handler.cancel()
    }
  }, [toc])

  const handleScrollTo = useEventCallback(
    (_i: number, $el: HTMLElement | null, _anchorId: string) => {
      if ($el) {
        springScrollToElement($el, -100).then(() => {
          throttleCallerRef.current?.cancel()
          setTimeout(() => {
            throttleCallerRef.current?.()
          }, 50)
        })
      }
    },
  )

  return { currentScrollRange, handleScrollTo }
}
