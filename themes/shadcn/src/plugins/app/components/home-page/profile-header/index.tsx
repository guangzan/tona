import { useNickname } from '@/plugins/app/hooks/use-nickname'
import { Avatar } from './avatar'
import { FollowButton } from './follow-button'
import { Followers } from './followers'
import { Tags } from './tags'
import { VerifiedIcon } from './verified-icon'

export function ProfileHeader() {
  const nickName = useNickname()

  return (
    <div className='screen-line-after relative flex border-edge border-x'>
      <div className='shrink-0 border-edge border-r'>
        <div className='mx-0.5 my-[3px]'>
          <Avatar />
        </div>
      </div>
      <div className='flex flex-1 flex-col'>
        <div className='flex grow items-end pb-1 pl-4'>
          <div className='line-clamp-1 select-none font-mono text-xs text-zinc-300 max-sm:hidden dark:text-zinc-800'>
            {'text-3xl '}
            <span className='inline dark:hidden'>text-zinc-950</span>
            <span className='hidden dark:inline'>text-zinc-50</span>
            {' font-medium'}
          </div>
        </div>
        <div className='border-edge border-t'>
          <h1 className='flex items-center pl-4 font-semibold text-3xl'>
            {nickName} &nbsp;
            <VerifiedIcon className='size-[0.6em] translate-y-px select-none text-info' />
          </h1>
          <div className='h-12 border-edge border-t py-1 pl-4 sm:h-auto'>
            <Tags />
          </div>
        </div>
      </div>
      <FollowButton />
      <Followers />
    </div>
  )
}
