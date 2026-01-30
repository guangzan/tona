import { getAboutOptions } from 'tona-options'
import { SimpleMarkdown } from '../../../../../components/ui/simple-markdown'
import { ProseMono } from '../../../../../components/ui/typography'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '../../panel'

export function About() {
  const { enable, bio } = getAboutOptions()

  if (!enable) return null

  return (
    <Panel id='about'>
      <PanelHeader>
        <PanelTitle>关于我</PanelTitle>
      </PanelHeader>
      <PanelContent>
        <ProseMono>
          <SimpleMarkdown>{bio}</SimpleMarkdown>
        </ProseMono>
      </PanelContent>
    </Panel>
  )
}
