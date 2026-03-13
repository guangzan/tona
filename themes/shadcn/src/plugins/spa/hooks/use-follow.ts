import { useCallback } from 'preact/hooks'
import { useAjaxComplete, useQueryDOM } from 'tona-hooks'
import { toast } from 'tona-sonner'
import { follow, isOwner, unfollow } from 'tona-utils'

function useFollowStatus() {
  return useQueryDOM({
    selector: '#p_b_follow',
    ajaxUrl: ['/ajax/blog-accessories'],
    observe: true,
    queryFn: (el) => {
      const tipsText = el?.textContent.trim()
      const isFollowed =
        tipsText === '-取消关注' ||
        tipsText === '关注成功' ||
        tipsText === '您已关注过'

      return {
        isFollowed,
      }
    },
  })
}

function useFollowToast() {
  return useAjaxComplete({
    urlPattern: '/ajax/Follow/FollowBlogger',
    onSuccess: (resp: string) => {
      toast.success(resp)
    },
    onError: () => {
      toast.error('关注失败')
    },
  })
}

export function useFollow() {
  useFollowToast()

  const { data, isPending } = useFollowStatus()

  const onToggleFollow = useCallback(() => {
    if (isOwner()) {
      toast.error('不能关注自己')
      return
    }
    const action = data?.isFollowed ? unfollow : follow
    action()
  }, [data?.isFollowed])

  return {
    onToggleFollow,
    isPending,
    isFollowed: !!data?.isFollowed,
  }
}
