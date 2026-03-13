import { RssIcon } from 'lucide-preact'
import { getRssUrl } from 'tona-utils'
import { cn } from '@/lib/utils'
import { ThemeToggle } from '../theme-toggle'

interface Props extends React.ComponentProps<'footer'> {
  containerClassName?: string
}

export function Footer({ containerClassName, ...props }: Props) {
  const rssUrl = getRssUrl()

  return (
    <footer className='max-w-screen overflow-x-hidden px-2' {...props}>
      <div
        className={cn(
          'screen-line-before mx-auto border-edge border-x py-4 md:max-w-3xl',
          containerClassName,
        )}
      >
        <p className='mb-1 text-balance px-4 text-center font-mono text-muted-foreground text-sm'>
          Built by{' '}
          <a
            href='https://github.com/guangzan'
            target='_blank'
            className='underline transition-colors hover:text-foreground'
            rel='noreferrer noopener'
          >
            Zane
          </a>
          . Powered by{' '}
          <a
            href='https://www.cnblogs.com'
            target='_blank'
            className='underline transition-colors hover:text-foreground'
            rel='noreferrer noopener'
          >
            博客园
          </a>
          .
        </p>

        <p className='text-balance px-4 text-center font-mono text-muted-foreground text-sm'>
          The source code is available on{' '}
          <a
            href='https://github.com/guangzan/tona'
            target='_blank'
            className='underline transition-colors hover:text-foreground'
            rel='noreferrer noopener'
          >
            GitHub
          </a>
          .
        </p>
      </div>
      <div className='screen-line-before screen-line-after flex w-full before:z-1 after:z-1'>
        <div className='mx-auto flex items-center justify-center gap-3 border-edge border-x bg-background px-4'>
          <ThemeToggle />
          <div className='flex h-11 w-px bg-edge' />
          <a
            className='flex items-center text-muted-foreground transition-colors hover:text-foreground'
            href={rssUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            <RssIcon className='size-4' />
            <span className='sr-only'>RSS</span>
          </a>
        </div>
      </div>
      <div className='pb-[env(safe-area-inset-bottom,0px)]'>
        <div className='flex h-4' />
      </div>
    </footer>
  )
}
