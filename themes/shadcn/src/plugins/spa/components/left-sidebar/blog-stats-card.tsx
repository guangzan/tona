import {
  BookOpen,
  Eye,
  FileText,
  MessageSquare,
  TrendingUp,
} from 'lucide-preact'
import { useBlogStats } from './hooks'

const getIcon = (id: string) => {
  switch (id) {
    case 'postCount':
      return <FileText className='h-4 w-4' />
    case 'articleCount':
      return <BookOpen className='h-4 w-4' />
    case 'commentCount':
      return <MessageSquare className='h-4 w-4' />
    case 'viewCount':
      return <Eye className='h-4 w-4' />
    default:
      return <FileText className='h-4 w-4' />
  }
}

const formatNumber = (num: number): string => {
  if (num >= 10000) {
    return `${(num / 10000).toFixed(1)}万`
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}千`
  }
  return num.toString()
}

export function BlogStatsCard() {
  const { isPending, data } = useBlogStats()

  if (isPending || !data) {
    return null
  }

  return (
    <div className='rounded-xl border bg-card transition-all duration-300 hover:shadow-md'>
      <div className='p-4'>
        <div className='mb-4 flex items-center gap-2'>
          <TrendingUp className='h-4 w-4 text-primary' />
          <h3 className='font-semibold text-foreground text-sm'>博客统计</h3>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {data.map((item) => (
            <div
              key={item.id}
              className='flex flex-col items-center justify-center rounded-lg bg-muted/50 p-3 transition-colors hover:bg-muted'
            >
              <div className='mb-2 text-muted-foreground'>
                {getIcon(item.id)}
              </div>
              <div className='text-center'>
                <div className='font-semibold text-foreground text-lg'>
                  {formatNumber(item.value)}
                </div>
                <div className='text-muted-foreground text-xs'>
                  {item.title}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
