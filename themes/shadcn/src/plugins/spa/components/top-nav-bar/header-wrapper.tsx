import { useWindowScroll } from 'tona-hooks'
import { cn } from '@/lib/utils'

function Header({ className, ...rest }: React.ComponentProps<'header'>) {
  return (
    <header
      className={cn(
        'max-w-screen overflow-x-hidden bg-background px-2',
        className,
      )}
      {...rest}
    />
  )
}

function StickyHeader({ className, ...rest }: React.ComponentProps<'header'>) {
  const { y } = useWindowScroll()
  const affix = y >= 8
  return (
    <Header
      data-affix={affix}
      className={cn(
        'sticky top-0 z-50 pt-2 transition-shadow duration-300',
        'data-[affix=true]:shadow-[0_0_16px_0_black]/8',
        'not-dark:data-[affix=true]:**:data-header-container:after:bg-border',
        'dark:data-[affix=true]:shadow-[0_0_16px_0_black]',
        className,
      )}
      {...rest}
    />
  )
}

interface Props extends React.ComponentProps<'header'> {
  sticky?: boolean
}

export function HeaderWrapper({ sticky, ...rest }: Props) {
  if (sticky) {
    return <StickyHeader {...rest} />
  }
  return <Header {...rest} />
}
