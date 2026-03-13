import { EditButton } from './edit-button'
import { FavoriteButton } from './favorite-button'
import { FollowButton } from './follow-button'
import { VoteButton } from './vote-button'

export function PostActions() {
  return (
    <div className='screen-line-before screen-line-after flex flex-wrap items-center justify-center gap-4 border-edge border-x py-6 md:max-w-5xl'>
      <VoteButton></VoteButton>
      <FollowButton></FollowButton>
      <FavoriteButton></FavoriteButton>
      <EditButton></EditButton>
    </div>
  )
}
