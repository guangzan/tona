import { getNickname } from 'tona-utils'

export function useNickname() {
  const nickName = getNickname() || '博主'
  if (nickName === 'guangzan') {
    return 'zane'
  }
  return nickName
}
