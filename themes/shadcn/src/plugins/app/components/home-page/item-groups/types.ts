export interface ItemGroupItem {
  title: string
  href: string
  categories: string[]
  lightIcon: string
  darkIcon?: string
}

export interface ItemGroup {
  group: string
  items: ItemGroupItem[]
}

export type ItemGroups = ItemGroup[]
