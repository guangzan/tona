import { memo } from 'preact/compat'
import { useEffect, useRef } from 'preact/hooks'

interface PostDetailsProps {
  onReady?: () => void
}

export const PostDetails = memo(({ onReady }: PostDetailsProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const onReadyRef = useRef(onReady)

  useEffect(() => {
    onReadyRef.current = onReady
  }, [onReady])

  useEffect(() => {
    const element = document.getElementById('cnblogs_post_body') as HTMLElement
    const container = containerRef.current

    if (element && container) {
      container.appendChild(element)
      setTimeout(() => {
        onReadyRef.current?.()
      }, 0)
    }
  }, [])

  return (
    <div className='w-full border-edge border-x px-2 md:px-4'>
      <div
        ref={containerRef}
        className='custom-markdown mx-auto pt-8 md:max-w-4xl'
      ></div>
    </div>
  )
})
