import { memo } from 'preact/compat'
import { BasicTooltip } from '../../basic-tooltip'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '../../panel'
import { Separator } from '../../separator'
import { ITEM_GROUPS } from './constants'
import type { ItemGroupItem } from './types'

interface ItemIconProps {
  title: string
  lightIcon: string
  darkIcon?: string
}

const ItemIcon = memo(({ title, lightIcon, darkIcon }: ItemIconProps) => {
  return (
    <>
      <img
        src={lightIcon}
        alt={`${title} light icon`}
        width={32}
        height={32}
        loading='eager'
        decoding='async'
        className='!size-8 hidden [html.light_&]:block'
      />
      <img
        src={darkIcon ?? lightIcon}
        alt={`${title} dark icon`}
        width={32}
        height={32}
        loading='eager'
        decoding='async'
        className='!size-8 hidden [html.dark_&]:block'
      />
    </>
  )
})

interface ItemGroupsProps {
  groups?: typeof ITEM_GROUPS
}

export function ItemGroups({ groups = ITEM_GROUPS }: ItemGroupsProps) {
  return (
    <>
      {groups.map((group, index) => (
        <div key={group.group}>
          <Panel id={group.group === '技术栈' ? 'stack' : 'tools'}>
            <PanelHeader>
              <PanelTitle>{group.group}</PanelTitle>
            </PanelHeader>
            <PanelContent>
              <ul className='flex select-none flex-wrap gap-4'>
                {group.items.map((item: ItemGroupItem) => (
                  <li key={item.title} className='flex'>
                    <BasicTooltip title={item.title}>
                      <a
                        href={item.href}
                        target='_blank'
                        rel='noopener noreferrer'
                        aria-label={item.title}
                        className='block size-8'
                      >
                        <ItemIcon
                          title={item.title}
                          lightIcon={item.lightIcon}
                          darkIcon={item.darkIcon}
                        />
                        <span className='sr-only'>{item.title}</span>
                      </a>
                    </BasicTooltip>
                  </li>
                ))}
              </ul>
            </PanelContent>
          </Panel>
          {index < groups.length - 1 && <Separator />}
        </div>
      ))}
    </>
  )
}
