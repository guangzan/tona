import { useEffect, useMemo, useState } from 'preact/hooks'

export const useReadPercent = () => {
  const [scrollTop, setScrollTop] = useState(0)

  useEffect(() => {
    const handler = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop
      setScrollTop(scrollY)
    }
    handler()
    window.addEventListener('scroll', handler, { passive: true })
    return () => {
      window.removeEventListener('scroll', handler)
    }
  }, [])

  const readPercent = useMemo(() => {
    const winHeight = window.innerHeight
    const markdownElement = document.getElementById(
      'cnblogs_post_body',
    ) as HTMLElement

    // 如果没有文章容器，返回 0
    if (!markdownElement) {
      return 0
    }

    // 计算可滚动区域的高度（总高度减去视口高度）
    const scrollableHeight = document.documentElement.scrollHeight - winHeight

    // 如果可滚动高度为 0 或负数，返回 0
    if (scrollableHeight <= 0) {
      return 0
    }

    // 计算阅读进度百分比
    const progress = Math.min(
      100,
      Math.max(0, (scrollTop / scrollableHeight) * 100),
    )

    return Math.floor(progress)
  }, [scrollTop])

  return [readPercent, scrollTop]
}
