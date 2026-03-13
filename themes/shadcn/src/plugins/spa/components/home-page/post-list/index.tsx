import { Panel, PanelContent, PanelHeader, PanelTitle } from '../../panel'
import { PostPagination } from '../post-pagination'
import { usePostList } from './hooks'
import { PostListItem } from './post-list-item'

export function PostList() {
  const { data: items } = usePostList()

  if (!items || items.length === 0) {
    return null
  }

  return (
    <Panel id='posts'>
      <PanelHeader>
        <PanelTitle>最新博文</PanelTitle>
      </PanelHeader>
      <PanelContent className='p-0'>
        <div className='flex flex-col'>
          {items.map((item) => (
            <PostListItem key={`${item.href}-${item.title}`} item={item} />
          ))}
        </div>
        <PostPagination />
      </PanelContent>
    </Panel>
  )
}
