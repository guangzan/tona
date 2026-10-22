;(() => {
  const manager = window.collectionManager
  const root = document.querySelector(
    '#cnblogs_post_body > .current-collection',
  )

  if (!manager || !root) return

  const list = root.querySelector('.current-collection-links')
  if (!list) return

  const items = [...list.querySelectorAll('.current-collection-item')]
  manager.collectionId = 10001
  manager.collectionName = '前端性能优化笔记'
  manager.currentPostId = 10003
  manager.posts = items.map((item, index) => ({
    postId: 10001 + index,
    title:
      item
        .querySelector('.current-collection-item-title')
        ?.textContent.trim() ?? '',
    url: item.getAttribute('href') || '#',
    datePublished: `2026-01-${String(index + 1).padStart(2, '0')}T02:00:00Z`,
  }))
  manager.list = list
  manager.normalInstance = root
  manager.mode = 'normal'

  const titleArrow = root.querySelector('.current-collection-title-arrow')
  const pinButton = root.querySelector('.icon-pin')
  const footer = root.querySelector('.current-collection-footer')

  const toggleCollapse = () => {
    manager.toggleCollapse()
    titleArrow?.setAttribute(
      'aria-expanded',
      String(!root.classList.contains('collapsed')),
    )
  }

  const openPinnedNavigator = (event) => {
    event.preventDefault()
    event.stopPropagation()

    const rect = event.currentTarget.getBoundingClientRect()
    const x = Math.max(16, Math.min(rect.left, window.innerWidth - 616))
    const y = Math.max(16, Math.min(rect.bottom + 8, window.innerHeight - 316))
    manager.togglePinnedCollectionNavigator(x, y)
  }

  const bindAction = (element, action) => {
    element?.addEventListener('click', action)
    element?.addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return
      event.preventDefault()
      action(event)
    })
  }

  bindAction(titleArrow, toggleCollapse)
  bindAction(pinButton, openPinnedNavigator)
  footer?.addEventListener('click', toggleCollapse)
})()
