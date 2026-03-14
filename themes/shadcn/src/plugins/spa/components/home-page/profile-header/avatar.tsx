import { useContext } from 'preact/hooks'
import { AvatarContext } from '@/plugins/spa/context/avatar-context'

export function Avatar() {
  const avatar = useContext(AvatarContext)

  return (
    <img
      className="!size-32 select-none rounded-full ring-1 ring-border ring-offset-2 ring-offset-background sm:size-40"
      alt="avatar"
      src={avatar}
      fetchPriority="high"
      decoding="sync"
    />
  )
}
