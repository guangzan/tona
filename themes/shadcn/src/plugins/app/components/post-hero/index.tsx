import { useContext } from 'preact/hooks'
import { BubbleBackground } from '../../../../components/ui/bubble-background'
import { AvatarContext } from '../../context/avatar-context'
import { useNickname } from '../../hooks/use-nickname'
import { usePostInfo, usePostTitle } from './hooks'

export function PostHero() {
  const avatar = useContext(AvatarContext)
  const title = usePostTitle()
  const postInfo = usePostInfo()
  const nickName = useNickname()

  return (
    <div className='screen-line-after border-edge border-x px-4 py-8 md:py-20'>
      <div className='mx-auto flex flex-col items-center gap-6 md:max-w-5xl'>
        <div className='relative h-[180px] w-full max-w-4xl overflow-hidden md:h-[280px]'>
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
          <div className='pointer-events-none relative z-10 flex h-full flex-col justify-center px-8 py-12 text-center md:px-12'>
            <div className='mb-3 font-medium text-sm text-white/80 md:text-base'>
              {postInfo.data?.publishTime || '\u200B'}
            </div>
            <h1 className='mb-6 font-bold text-2xl text-white leading-tight drop-shadow-lg md:text-4xl md:leading-tight'>
              {title.data || '\u200B'}
            </h1>
            <div className='flex items-center justify-center gap-3'>
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
          </div>
        </div>
      </div>
    </div>
  )
}
