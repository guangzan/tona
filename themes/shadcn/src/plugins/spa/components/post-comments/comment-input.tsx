import { useEffect, useRef } from 'preact/hooks'
import './comment-input.css'

export function CommentInput() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const commentFormContainer = document.getElementById(
      'comment_form_container',
    )
    const container = containerRef.current

    if (commentFormContainer && container) {
      container.appendChild(commentFormContainer)
    }
  }, [])

  return <div ref={containerRef} className='custom-comment-input' />
}
