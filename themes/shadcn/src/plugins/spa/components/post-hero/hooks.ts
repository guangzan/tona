import { useQueryDOM } from 'tona-hooks'
import { getCurrentPostDateAdded } from 'tona-utils'
// import { __DEV__ } from '../../constants/env'

export function usePostTitle() {
  return useQueryDOM({
    selector: '#cb_post_title_url',
    queryFn: (el) => {
      return el?.querySelector('[role="heading"]')?.innerHTML ?? ''
    },
  })
}

interface PostInfo {
  publishTime: string | null
  updateTime: string | null
  readingTime: number
}

/**
 * 计算阅读时间（分钟）
 * 中文按 x 字/分钟，英文按 x 字/分钟
 */
function calculateReadingTime(text: string): number {
  if (!text) return 0

  // 中文字符数量
  const chineseChars = (text.match(/[\u4e00-\u9fa5]/g) || []).length
  // 非中文字符数量（去除空格和标点）
  const englishChars = text.replace(/[\u4e00-\u9fa5\s\p{P}]/gu, '').length

  const chineseTime = chineseChars / 500
  const englishTime = englishChars / 600

  return Math.max(1, Math.ceil(chineseTime + englishTime))
}

export function usePostInfo() {
  return useQueryDOM({
    selector: '#cnblogs_post_body',
    observe: true,
    queryFn: (el) => {
      const publishTime = getCurrentPostDateAdded()

      // 获取文章内容计算阅读时间
      // 文章内容可能动态加载，所以需要每次都重新查询
      const readingTime = el ? calculateReadingTime(el.textContent || '') : 0

      // 博客园默认不提供更新时间，如果需要可以从其他地方获取
      // 这里先返回 null，如果后续有更新时间的元素可以添加
      const updateTime = null

      return {
        publishTime,
        updateTime,
        readingTime,
      } satisfies PostInfo
    },
  })
}

export function useHeroImage() {
  return 'https://dummyimage.com/850x427/000/fff'
}
