import { isOwner } from 'tona-utils'
import { Button } from '@/components/ui/button'
import { usePostEditLink } from './hooks'

export function EditButton() {
  const { data } = usePostEditLink()
  const editHref = data?.editHref || ''

  if (!isOwner() || !editHref) {
    return null
  }

  return (
    <Button variant='link' asChild size='sm'>
      <a href={editHref}>编辑</a>
    </Button>
  )
}
