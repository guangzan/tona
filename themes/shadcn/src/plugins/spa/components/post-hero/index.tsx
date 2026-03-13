import { useContext } from 'preact/hooks'
import { getIndexUrl } from 'tona-utils'
import { BubbleBackground } from '../../../../components/ui/bubble-background'
import { AvatarContext } from '../../context/avatar-context'
import { useNickname } from '../../hooks/use-nickname'
import { usePostInfo, usePostTitle } from './hooks'

function PostHeroUserInfo() {
  const avatar = useContext(AvatarContext)
  const nickName = useNickname()

  const handleClick = () => {
    window.location.href = getIndexUrl()
  }

  return (
    <div
      className='flex cursor-default items-center justify-center gap-3'
      onClick={handleClick}
    >
      <img
        className='!size-10 rounded-full border-2 border-white/20 shadow-lg'
        src={avatar}
        alt='avatar'
        fetchPriority='high'
        width={40}
        height={40}
      />
      <h4 className='font-semibold text-base text-white/90 md:text-lg'>
        {nickName}
      </h4>
    </div>
  )
}

function PostHeroContent({ children }: { children: React.ReactNode }) {
  return (
    <div className='relative z-10 flex h-full flex-col justify-center px-8 py-12 text-center md:px-12'>
      {children}
    </div>
  )
}

function PostHeroPublishTime() {
  const postInfo = usePostInfo()

  return (
    <div className='mb-2 font-medium text-sm text-white/80 md:text-base'>
      {postInfo.data?.publishTime || '\u200B'}
    </div>
  )
}

function PostHeroTitle() {
  const title = usePostTitle()

  return (
    <h1 className='mb-4 font-bold text-2xl text-white leading-tight drop-shadow-lg md:text-4xl md:leading-tight'>
      {title.data || '\u200B'}
    </h1>
  )
}

function PostHeroContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className='screen-line-after border-edge border-x px-4 py-8 md:py-20'>
      <div className='mx-auto flex flex-col items-center gap-6 md:max-w-5xl'>
        <div className='relative h-[180px] w-full max-w-4xl overflow-hidden md:h-[280px]'>
          {children}
        </div>
      </div>
    </div>
  )
}

export function PostHero() {
  return (
    <PostHeroContainer>
      <BubbleBackground
        interactive
        className='absolute inset-0 flex items-center justify-center'
        colors={{
          first: '18,113,255',
          second: '221,74,255',
          third: '0,220,255',
          fourth: '200,50,50',
          fifth: '180,180,50',
          sixth: '140,100,255',
        }}
      ></BubbleBackground>
      <PostHeroContent>
        <PostHeroTitle></PostHeroTitle>
        <PostHeroPublishTime></PostHeroPublishTime>
        <PostHeroUserInfo />
      </PostHeroContent>
    </PostHeroContainer>
  )
}
