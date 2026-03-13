import { memo } from 'preact/compat'
import { getItemGroupsOptions } from 'tona-options'
import { BasicTooltip } from '../../basic-tooltip'
import { Panel, PanelContent, PanelHeader, PanelTitle } from '../../panel'
import { Separator } from '../../separator'

interface ItemGroupItem {
  title: string
  href: string
  lightIcon: string
  darkIcon?: string
}

interface ItemGroup {
  group: string
  items: ItemGroupItem[]
}

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

export function ItemGroups() {
  const { enable, groups } = getItemGroupsOptions()

  if (!enable || groups.length === 0) return null

  return (
    <>
      {groups.map((group: ItemGroup, index: number) => (
        <div key={group.group}>
          <Panel id={group.group}>
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
