import { cn } from '@/lib/utils'
import { FlickeringGrid } from '../../../../../components/ui/flickering-grid'
import { HyperText } from '../../../../../components/ui/hyper-text'
import { useNickname } from '../../../hooks/use-nickname'

export function ProfileCover() {
  const nickName = useNickname()

  return (
    <div
      className={cn(
        'aspect-2/1 select-none border-edge border-x sm:aspect-3/1',
        'flex items-center justify-center text-black dark:text-white',
        'screen-line-before screen-line-after before:-top-px after:-bottom-px',
      )}
    >
      <div className='relative h-full w-full overflow-hidden'>
        <FlickeringGrid
          className='absolute inset-0 z-0 size-full'
          squareSize={4}
          gridGap={6}
          color='#6B7280'
          maxOpacity={0.5}
          flickerChance={0.1}
          height={300}
          width={800}
        />
        <HyperText className='flex h-full w-full items-center justify-center text-7xl'>
          {nickName}
        </HyperText>
      </div>
    </div>
  )
}
