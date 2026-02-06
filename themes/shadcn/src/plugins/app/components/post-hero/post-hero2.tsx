import { useContext } from 'preact/hooks'
import { AvatarContext } from '../../context/avatar-context'
import { useNickname } from '../../hooks/use-nickname'
import { useHeroImage, usePostInfo, usePostTitle } from './hooks'

export function PostHero2() {
  const avatar = useContext(AvatarContext)
  const title = usePostTitle()
  const postInfo = usePostInfo()
  const heroImage = useHeroImage()
  const nickName = useNickname()

  return (
    <div className='screen-line-after border-edge border-x px-4 py-12'>
      <div className='mx-auto flex flex-col items-center gap-2 md:max-w-5xl'>
        <img
          className='mb-10 h-auto w-[850px]'
          alt='post hero'
          src={heroImage}
          fetchPriority='high'
        />
        <div className='mb-4 text-muted-foreground'>
          {postInfo.data?.publishTime}
        </div>
        <h1 className='mb-4 font-bold text-2xl'>{title.data}</h1>
        <div class='flex items-center gap-2'>
          <img
            class='!size-10 rounded-full'
            src={avatar}
            alt='avatar'
            fetchPriority='high'
          />
          <h4 className='font-bold text-md'>{nickName}</h4>
        </div>
      </div>
    </div>
  )
}
