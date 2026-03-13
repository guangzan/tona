import { Calendar, Clock } from 'lucide-preact'
import { memo } from 'preact/compat'
import { usePostInfo } from './hooks'

export const PostInfo = memo(() => {
  const { data } = usePostInfo()

  if (!data) {
    return null
  }

  const { publishTime, updateTime, readingTime } = data

  return (
    <div className='mt-2 flex flex-wrap items-center gap-4 text-neutral-600 text-sm dark:text-neutral-400'>
      {publishTime && (
        <div className='flex items-center gap-1.5'>
          <Calendar size={16} strokeWidth={1} />
          <span>发布于 {publishTime}</span>
        </div>
      )}

      {updateTime && updateTime !== publishTime && (
        <div className='flex items-center gap-1.5'>
          <Calendar size={16} strokeWidth={1} />
          <span>更新于 {updateTime}</span>
        </div>
      )}

      {readingTime > 0 && (
        <div className='flex items-center gap-1.5'>
          <Clock size={16} strokeWidth={1} />
          <span>阅读时间约 {readingTime} 分钟</span>
        </div>
      )}
    </div>
  )
})
