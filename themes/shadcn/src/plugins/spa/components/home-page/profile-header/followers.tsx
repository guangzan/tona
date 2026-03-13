import { getFollowersUrl } from 'tona-utils'
import { useFollowers } from '@/plugins/spa/hooks/use-followers'

export function Followers() {
  const { data: followerCount } = useFollowers()

  if (typeof followerCount !== 'number') {
    return null
  }

  return (
    <a
      href={getFollowersUrl()}
      target='_blank'
      className='absolute top-9 right-1 cursor-default text-muted-foreground text-xs md:top-11'
    >
      {followerCount} followers
    </a>
  )
}
