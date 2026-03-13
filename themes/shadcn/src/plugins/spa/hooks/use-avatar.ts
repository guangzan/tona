import { useMemo } from 'preact/hooks'
import { useQueryDOM } from 'tona-hooks'
import { getThemeOptions } from 'tona-options'
import { __DEV__ } from '../constants/env'

const devAvatar = 'https://dummyimage.com/64x64/000/fff'
// const prodDefaultAvatar = 'https://assets.cnblogs.com/icons/avatar-default.svg'

export function useAvatar(): string | null {
  const { avatar: userCustomAvatar } = useMemo(() => getThemeOptions(), [])

  const { data: sidebarAvatar } = useQueryDOM<string | null>({
    selector: '#sidebar_news #user_icon, #profile_block img',
    observe: true,
    queryFn: (el) => {
      if (!el) return null
      if (!(el instanceof HTMLImageElement)) return null
      if (!el.src) return null
      if (el.src.includes('avatar-default')) return null
      return el.src
    },
  })

  const { data: topNavbarAvatar } = useQueryDOM<string | null>({
    selector: '#user_icon.navbar-avatar',
    observe: true,
    queryFn: (el) => {
      if (!el) return null
      if (!(el instanceof HTMLImageElement)) return null
      if (!el.src) return null
      if (el.src.includes('avatar-default')) return null
      return el.src
    },
  })

  if (__DEV__) {
    return devAvatar
  }

  return userCustomAvatar || sidebarAvatar || topNavbarAvatar
}
