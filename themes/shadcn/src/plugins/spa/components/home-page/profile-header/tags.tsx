import { getAboutOptions } from 'tona-options'
import { FlipSentences } from '@/plugins/spa/components/flip-sentences'

export function Tags() {
  const { tags } = getAboutOptions()

  return (
    <FlipSentences className='text-balance font-mono text-muted-foreground text-sm'>
      {tags}
    </FlipSentences>
  )
}
