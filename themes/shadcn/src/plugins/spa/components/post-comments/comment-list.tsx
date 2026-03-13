import { useAjaxComplete } from 'tona-hooks'
import { toast } from 'tona-sonner'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '../panel'
import { Separator } from '../separator'
import { CommentEmpty } from './comment-empty'
import { CommentItemComponent } from './comment-item'
import { CommentSkeleton } from './comment-skeleton'
import { useComments } from './hooks'

export function CommentList() {
  useAjaxComplete({
    urlPattern: ['PostComment/Add', 'DeleteComment'],
    onSuccess: () => {
      new window.blogCommentManager().renderComments(0)
    },
  })

  useAjaxComplete({
    urlPattern: '/ajax/vote/comment',
    onSuccess: (resp: {
      data: null | string
      id: number
      isSuccess: boolean
      message: string
    }) => {
      if (resp.isSuccess) {
        toast.success('投票成功')
        new window.blogCommentManager().renderComments(0)
      } else {
        toast.error(resp.message)
      }
    },
    onError: () => {
      toast.error('投票失败')
    },
  })

  const { data: comments, isPending } = useComments()

  if (isPending) {
    return <CommentSkeleton count={comments?.length || 3} />
  }

  if (!comments || comments.length === 0) {
    return <CommentEmpty />
  }

  return (
    <Panel id='comments'>
      <PanelHeader>
        <PanelTitle>评论</PanelTitle>
      </PanelHeader>
      <PanelContent className='p-0'>
        {comments.map((comment, index) => (
          <>
            <CommentItemComponent key={comment.id} comment={comment} />
            {index < comments.length - 1 && (
              <Separator className='screen-line-after h-4 border-none' plain />
            )}
          </>
        ))}
      </PanelContent>
    </Panel>
  )
}
