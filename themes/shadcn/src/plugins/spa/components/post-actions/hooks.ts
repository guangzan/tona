import { useQueryDOM } from 'tona-hooks'

export function useVoteStatus() {
  return useQueryDOM({
    selector: '#div_digg',
    ajaxUrl: '/ajax/vote/blogpost',
    observe: true,
    queryFn: (el) => {
      const diggCountElement = el?.querySelector('#digg_count')
      const diggCount = parseInt(diggCountElement?.textContent || '0', 10)
      const tipsText = el?.querySelector('#digg_tips')?.textContent

      // 注意这里要判断 '支持成功 撤回' 而不是 '支持成功'，因为取消支持的 textContent 是 ‘取消支持成功’
      const isLiked =
        tipsText?.includes('您已推荐过') || tipsText?.includes('支持成功 撤回')

      return {
        diggCount,
        isLiked,
      }
    },
  })
}

export function useFavoriteStatus() {
  return useQueryDOM({
    selector: '#green_channel_favorite',
    // observe: true,
    queryFn: () => {
      // const isFavorite = el?.querySelector('#favorite_tips')?.textContent?.includes('您已收藏过')
      return {
        isFavorite: false,
      }
    },
  })
}

export function usePostEditLink() {
  return useQueryDOM({
    selector: '.postDesc',
    observe: false,
    queryFn: (el) => {
      const editLinkEl =
        el?.querySelector('a[href*="EditPosts"]') ??
        Array.from(el?.querySelectorAll('a') ?? []).find(
          (anchor) => anchor.textContent?.trim() === '编辑',
        )

      return {
        editHref: editLinkEl?.getAttribute('href') || '',
      }
    },
  })
}
