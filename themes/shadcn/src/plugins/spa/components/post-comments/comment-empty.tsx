import { MessageSquare } from 'lucide-preact'

export function CommentEmpty() {
  return (
    <div className='screen-line-before screen-line-after flex flex-col items-center justify-center border-edge border-x py-12'>
      <MessageSquare className='mb-3 h-8 w-8 text-muted-foreground' />
      <div className='text-muted-foreground text-sm'>暂无评论</div>
      <div className='mt-1 text-muted-foreground/70 text-xs'>
        成为第一个评论的人吧
      </div>
    </div>
  )
}
