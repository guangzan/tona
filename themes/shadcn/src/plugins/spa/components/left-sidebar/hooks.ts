import { useQueryDOM } from 'tona-hooks'

export function useBlogStats() {
  return useQueryDOM({
    selector: '.blogStats',
    queryFn: (el) => {
      if (!el) {
        return []
      }

      const postCountText =
        el.querySelector('#stats_post_count')?.textContent || ''
      const articleCountText =
        el.querySelector('#stats_article_count')?.textContent || ''
      const commentCountText =
        el.querySelector('#stats-comment_count')?.textContent || ''
      const viewCountText =
        el.querySelector('#stats-total-view-count')?.textContent || ''

      const extractNumber = (text: string) => {
        const match = text.match(/\d+/)
        return match ? Number.parseInt(match[0], 10) : 0
      }

      return [
        { id: 'postCount', value: extractNumber(postCountText), title: '随笔' },
        {
          id: 'articleCount',
          value: extractNumber(articleCountText),
          title: '文章',
        },
        {
          id: 'commentCount',
          value: extractNumber(commentCountText),
          title: '评论',
        },
        {
          id: 'viewCount',
          value: extractNumber(viewCountText),
          title: '浏览量',
        },
      ]
    },
  })
}
