import { Loader2, PlusIcon } from 'lucide-preact'
import { Button } from '@/components/ui/button'
import { useFollow } from '@/plugins/spa/hooks/use-follow'

export function FollowButton() {
  const { onToggleFollow, isPending, isFollowed } = useFollow()

  const buttonText = (() => {
    if (isPending) return '加载中'
    if (isFollowed) return '取消关注'
    return '关注'
  })()

  const icon = (() => {
    if (isPending) return <Loader2 size={18} className="animate-spin" />
    if (isFollowed) return null
    return <PlusIcon size={18} />
  })()

  return (
    <Button
      onClick={onToggleFollow}
      disabled={isPending}
      className="absolute top-1 right-1 rounded-full shadow-none md:top-2 md:right-2"
      size="sm"
      variant={isFollowed ? 'outline' : 'default'}
    >
      {icon}
      <span>{buttonText}</span>
    </Button>
  )
}
