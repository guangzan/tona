import { CircleProgress } from '@/components/ui/icons/progress'

export function ReadPercent({ readPercent }: { readPercent: number }) {
  return (
    <div className="flex items-center gap-2 tabular-nums">
      <CircleProgress percent={readPercent!} size={14} strokeWidth={2} />
      <span>{readPercent}%</span>
      <br />
    </div>
  )
}
