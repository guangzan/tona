import { CommentInput } from './comment-input'
import { CommentList } from './comment-list'
import { CommentPagination } from './comment-pagination'

export function PostComments() {
  return (
    <div class='flex flex-col'>
      <CommentList />
      <CommentPagination />
      <CommentInput />
    </div>
  )
}
