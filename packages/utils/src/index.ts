/**
 * 判断访问者是否为博主
 * @returns {boolean} boolean - 是否为博主
 */
export function isOwner(): boolean {
  return window.isBlogOwner
}

/**
 * 判断用户登录是否登录
 * @returns {boolean} 是否登录
 */
export function getLoginState(): boolean {
  return window.isLogined
}

/**
 * 判断是否开启公告
 * @returns {boolean} 是否开启公告
 */
export function openNews(): boolean {
  return !!$('#profile_block').length
}

/**
 * 获取粉丝数
 * @returns {string} 粉丝数
 */
export function getFollowers(): string {
  return openNews()
    ? $('#profile_block a:nth-of-type(3)').text().trim()
    : '未知'
}

/**
 * 获取关注的人数
 * @returns {string} 关注的人数
 */
export function getFollowing(): string {
  return openNews()
    ? $('#profile_block a:nth-of-type(4)').text().trim()
    : '未知'
}

/**
 * 判断是否已经关注
 * @returns {boolean} 是否已经关注
 */
export function getFollowState(): boolean {
  return $('#p_b_follow>a').text().trim() === '-取消关注'
}

/**
 * 获取园龄
 * @returns {string} 园龄
 */
export function getBlogAge(): string {
  return openNews()
    ? $('#profile_block a:nth-of-type(2)').text().trim()
    : '未知'
}

/**
 * 获取当前博文链接
 * @returns {string} 当前博文链接
 */
export function getCurrentPostUrl(): string {
  return !location.href.includes('#')
    ? location.href
    : location.href.substring(0, location.href.lastIndexOf('#'))
}

/**
 * 获取博客园 user guid
 * @example '144690cc-79e2-4508-aa7f-08d6a1e9eeef'
 */
export function getBlogUserGuid(): string {
  if (window.cb_blogUserGuid) {
    return window.cb_blogUserGuid
  }

  const followElement = document.querySelector('#p_b_follow')
  const scriptElement = followElement?.nextElementSibling
  if (scriptElement?.tagName === 'SCRIPT' && scriptElement.textContent) {
    const match = scriptElement.textContent.match(
      /getFollowStatus\(['"]([^'"]+)['"]\)/,
    )
    if (match?.[1]) {
      return match[1]
    }
  }

  return ''
}

/**
 * 关注
 */
export function follow(): void {
  if (isOwner()) {
    return
  }
  const guid = getBlogUserGuid()
  window.follow(guid)
}

/**
 * 取消关注
 */
export function unfollow(): void {
  if (isOwner()) {
    return
  }
  const guid = getBlogUserGuid()
  window.unfollow(guid)
}

/**
 * 判断文章是否打开了评论
 * @returns {boolean} 文章是否打开了评论
 */
export function IsCommentTurnedOn(): boolean {
  return !!$('#tbCommentBody').length
}

/**
 * 判断是否为博文详情页
 * @returns {boolean} 是否为博文详情页
 */
export function isPostDetailsPage(): boolean {
  return !!$('#post_detail').length
}

/**
 * 是否为首页
 * @returns {boolean} 是否为首页
 */
export function isHomePage(): boolean {
  return !!$('.day').length
}

/**
 * 是否为标签列表页
 * @returns {boolean} 是否为标签列表页
 */
export function isTagListPage(): boolean {
  return !!$('#taglist_main').length
}

/**
 * 是否为博文详情页
 * @returns {boolean} 是否为博文详情页
 */
export function isEntrylistPage(): boolean {
  return !!$('.entrylistPosttitle').length
}

/**
 * 判断是否为相册页
 * @returns {boolean} 是否为相册页
 */
export function isAlbumPage(): boolean {
  return !!$('.gallery').length
}

/**
 * 判断是否为博文分类页
 * @returns {boolean} 是否为博文分类页
 */
export function isCategoryPage(): boolean {
  return !!$('.entrylistItem').length
}

export function getCurrentPage():
  | 'home'
  | 'post'
  | 'tags'
  | 'post-archive'
  | 'category'
  | 'photos'
  | 'photo-view'
  | 'unknown' {
  // 首页
  if (document.querySelectorAll('.day').length) {
    return 'home'
  }

  // 随笔详情页
  if (document.querySelector('#post_detail')) {
    return 'post'
  }

  // 我的标签页
  if (
    document.querySelector('#taglist_main') ||
    document.querySelector('#myposts')
  ) {
    return 'tags'
  }

  if (
    document.querySelector('.entrylistTitle')?.textContent?.includes('档案')
  ) {
    return 'post-archive'
  }

  // 随笔分类页
  if (
    document.querySelector('.entrylistTitle')?.textContent?.includes('随笔分类')
  ) {
    return 'category'
  }

  // 相册页
  if (
    document.querySelector('.gallery') &&
    !document.querySelector('#ViewPicture1_GalleryImage')
  ) {
    return 'photos'
  }

  // 照片预览页
  if (
    document.querySelector('.gallery') &&
    document.querySelector('#ViewPicture1_GalleryImage')
  ) {
    return 'photo-view'
  }

  return 'unknown'
}

/**
 * 判断编辑器类型是否为 md
 * @returns {boolean} 编辑器类型是否为 md
 */
export function isMd(): boolean {
  return $('#cnblogs_post_body').hasClass('cnblogs-markdown')
}

// TODO
/**
 * 判断编辑器类型是否为 tinymce 5
 */
export function isTinymce5(): boolean {
  return false
}

/**
 * 判断文章内容是否存在标题
 * @returns {boolean} 文章内容是否存在标题
 */
export function hasPostTitle(): boolean {
  return !!$(
    '#cnblogs_post_body>h1,#cnblogs_post_body>h2,#cnblogs_post_body>h3,#cnblogs_post_body>h4',
  ).length
}

/**
 * 推荐博文
 * 博客园过滤机制禁止调用 `window.votePost`
 * https://group.cnblogs.com/topic/115024.html
 */
export function likePost(): void {
  const diggElement = document.querySelector('.diggit') as HTMLElement
  if (diggElement) {
    diggElement.click()
  }
}

export function unLikePost(): void {
  const diggElement = document.querySelector('.digg_gray') as HTMLElement
  if (diggElement) {
    diggElement.click()
  }
}

/**
 * 获取用户信息
 * 仅当用户代码放到页脚 HTML 中才有效
 * @returns {Promise<unknown>} 表示用户信息的 Promise 对象
 */
export function getUserInfo(): Promise<unknown> {
  return new Promise((resolve) => {
    $(document).ajaxComplete((_, xhr, settings) => {
      if (settings.url === 'https://account.cnblogs.com/user/userinfo') {
        resolve($.parseJSON(xhr.responseText))
      }
    })
  })
}

/**
 * 获取消息数
 * @returns {string} 消息数
 */
export function getMessageCount(): string {
  return $('#msg_count').text()
}

/**
 * 获取随笔数量
 * @returns {string} 随笔数量
 */
export function getPostCount(): string {
  return $('#stats_post_count').text().trim().replace(/\D/g, '')
}

/**
 * 获取文章数量
 * @returns {string} 文章数量
 */
export function getArticleCount(): string {
  return $('#stats_article_count').text().trim().replace(/\D/g, '')
}

/**
 * 获取评论数量
 * @returns {string} 评论数量
 */
export function getCommentCount(): string {
  return $('#stats-comment_count').text().trim().replace(/\D/g, '')
}

/**
 * 获取博客访问总量
 * @returns {string} 博客访问总量
 */
export function getViewCount(): string {
  return $('#stats-total-view-count>span').text().trim()
}

export function setCodeTheme(mode: 'dark' | 'light') {
  const theme =
    mode === 'dark'
      ? window.darkModeCodeHighlightTheme
      : window.codeHighlightTheme

  window.highlighter.setTheme(theme)
}

export function getCurrentBlogId(): string {
  return window.currentBlogId
}

export function getCurrentBlogApp(): string {
  return window.currentBlogApp
}

export function checkIsLogin(): boolean {
  return window.isLogined
}

export function checkIsOwner(): boolean {
  return window.isBlogOwner
}

export function getSkinName(): string {
  return window.skinName
}

export function getVisitorUserId(): string {
  return window.visitorUserId
}

export function checkHasCustomScript(): boolean {
  return window.hasCustomScript
}

export function checkEnableMathjax(): boolean {
  return window.cb_enable_mathjax
}

export function getMathEngine(): number {
  return window.mathEngine
}

export function getCodeHighlightEngine(): number {
  return window.codeHighlightEngine
}

export function checkEnableCodeLineNumber(): boolean {
  return window.enableCodeLineNumber
}

export function getCodeHighlightTheme(): string {
  return window.codeHighlightTheme
}

export function getDarkModeCodeHighlightTheme(): string {
  return window.darkModeCodeHighlightTheme
}

export function checkIsDarkCodeHighlightTheme(): boolean {
  return window.isDarkCodeHighlightTheme
}

export function checkIsDarkModeCodeHighlightThemeDark(): boolean {
  return window.isDarkModeCodeHighlightThemeDark
}

export function checkIsDisableCodeHighlighter(): boolean {
  return window.isDisableCodeHighlighter
}

export function checkEnableCodeThemeTypeFollowSystem(): boolean {
  return window.enableCodeThemeTypeFollowSystem
}

export function checkEnableMacStyleCodeBlock(): boolean {
  return window.enableMacStyleCodeBlock
}

export function getCurrentPostId(): number | null {
  return window.currentPostId || null
}

export function getCurrentPostDateAdded(): string | null {
  return window.currentPostDateAdded || null
}

export function getAntiforgeryToken(): string | null {
  return (
    document.querySelector(
      'input[name="antiforgery_token"]',
    ) as HTMLInputElement
  )?.value
}

export function getNickname(): string | null {
  const title = document.title

  if (!title) {
    return null
  }

  // 匹配模式：提取标题中最后一个 "- 博客园" 之前的部分
  // 如果包含多个 "-"，取最后一个 "- 博客园" 前面的内容作为用户昵称
  const parts = title.split(' - ')

  if (parts.length >= 2 && parts[parts.length - 1] === '博客园') {
    // 移除最后的 "博客园" 部分，剩余部分重新组合
    const withoutBlogCn = parts.slice(0, -1).join(' - ')

    // 如果还有 "-"，取最后一部分作为用户昵称
    if (withoutBlogCn.includes(' - ')) {
      const nicknameParts = withoutBlogCn.split(' - ')
      return nicknameParts[nicknameParts.length - 1].trim()
    }

    return withoutBlogCn.trim()
  }

  return null
}

const { currentBlogApp } = window
const home = 'https://home.cnblogs.com'
const cnblog = 'https://www.cnblogs.com'
const iCnblog = 'https://i.cnblogs.com'
const msg = 'https://msg.cnblogs.com'

/* 用户详情页 */
export function getDetailUrl(): string {
  return `${home}/u/${currentBlogApp}`
}

/* 粉丝 */
export function getFollowersUrl(): string {
  return `${home}/u/${currentBlogApp}/followers`
}

/* 我的关注 */
export function getFolloweesUrl(): string {
  return `${home}/u/${currentBlogApp}/followees`
}

/* 博客园首页 */
export function getCnblogHomeUrl(): string {
  return cnblog
}

/* 订阅 */
export function getRssUrl(): string {
  return `${cnblog}/${currentBlogApp}/rss`
}

/* 用户博客首页 */
export function getIndexUrl(): string {
  return `${cnblog}/${currentBlogApp}`
}

/* 我赞 */
export function getMydiggedUrl(): string {
  return `${cnblog}/aggsite/mydigged`
}

/* 我评 */
export function getCommentedUrl(): string {
  return `${cnblog}/aggsite/mycommented`
}

/* 关注园友最新博文 */
export function getFollowingUrl(): string {
  return `${cnblog}/following`
}

/* 新随笔 */
export function getNewPostUrl(): string {
  return `${iCnblog}/posts/edit`
}

/* 联系 */
export function getSendUrl(): string {
  return $('#blog_nav_contact').attr('href') || ''
}

/* 管理 */
export function getAdminUrl(): string {
  return iCnblog
}

/* 消息 */
export function getMessageUrl(): string {
  return `${msg}`
}

/* 联系博主 */
export function getContactUrl(): string {
  return `${msg}/send/${currentBlogApp}`
}

/* 收藏 */
export function getAppWzUrl(): string {
  return 'https://wz.cnblogs.com'
}

/* 博问 */
export function getAppQUrl(): string {
  return 'https://q.cnblogs.com'
}

/* 闪存 */
export function getAppIngUrl(): string {
  return 'https://ing.cnblogs.com'
}

/* 小组 */
export function getAppGroupUrl(): string {
  return 'https://group.cnblogs.com'
}

/* 草稿箱 */
export function getDraftBoxUrl(): string {
  return `${iCnblog}/posts`
}

export function getEditPostUrl(): string {
  return `${iCnblog}/EditPosts.aspx?postid=${getCurrentPostId()}`
}
