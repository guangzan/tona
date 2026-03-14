import { useQueryDOM } from 'tona-hooks'

function usePostTitle() {
  return useQueryDOM({
    selector: '#cb_post_title_url',
    queryFn: (el) => {
      return el?.querySelector('[role="heading"]')?.innerHTML ?? ''
    },
  })
}

export function PostPage() {
  const { data: postTitle } = usePostTitle()

  return (
    <h1 class="py-8 text-center font-semibold text-2xl tracking-tight">
      {postTitle}
    </h1>
  )
}
