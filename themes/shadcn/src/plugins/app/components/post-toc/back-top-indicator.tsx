import { ArrowUp } from 'lucide-preact'
import { memo } from 'preact/compat'
import { cn } from '@/lib/utils'
import { useReadPercent } from './hooks/use-read-percent'

export const BackTopIndicator = memo(() => {
  const [readPercent] = useReadPercent()

  return (
    <div
      className={cn(
        'mt-4 flex grow flex-col text-gray-800 text-xs dark:text-neutral-300',
        '@[700px]:-translate-x-4 @[800px]:-translate-x-8 @[900px]:translate-x-0 @[900px]:items-start',
      )}
    >
      <button
        className={cn(
          'mt-1 flex flex-nowrap items-center whitespace-nowrap opacity-50 transition-all duration-500 hover:opacity-100',
          readPercent! > 10 ? '' : 'pointer-events-none opacity-0',
        )}
        type='button'
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'instant' })
        }}
      >
        <ArrowUp className='h-4 w-4' />
        <span className='ml-1'>返回顶部</span>
        <span className='w-10 text-center'>{readPercent}%</span>
      </button>
    </div>
  )
})
