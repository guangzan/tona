import { cva } from 'class-variance-authority'
import { ChevronUp } from 'lucide-preact'
import { useEffect, useState } from 'preact/hooks'
import { getCurrentPage } from 'tona-utils'

const backToTopVariants = cva(
  'fixed right-8 bottom-8 z-50 rounded-full border-none bg-transparent p-3 transition-all duration-300 ease-in-out hover:bg-primary hover:text-primary-foreground',
  {
    variants: {
      visible: {
        true: 'translate-y-0 opacity-100',
        false: 'translate-y-4 opacity-0',
      },
    },
    defaultVariants: {
      visible: false,
    },
  },
)

function Component() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const shouldShow = window.pageYOffset > 300
      setIsVisible(shouldShow)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label='回到顶部'
      className={`${backToTopVariants({ visible: isVisible })}`}
      type='button'
    >
      <ChevronUp className='h-5 w-5' />
    </button>
  )
}

export function BackToTop() {
  const currentPage = getCurrentPage()
  if (currentPage === 'post') {
    return null
  }
  return <Component />
}
