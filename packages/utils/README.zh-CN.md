# tona-utils

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  用于博客园主题开发的工具函数库。
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-utils"><img src="https://img.shields.io/npm/v/tona-utils?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-utils?style=flat-square" alt="license"></a>
</p>

[English](./README.md) | **中文**

## 特性

- **博客上下文** - 检测页面类型、用户状态和博客信息
- **用户操作** - 关注、取消关注、推荐文章
- **URL 助手** - 生成博客园 URL
- **DOM 工具** - 基于 jQuery 的 DOM 辅助函数
- **TypeScript 支持** - 完整的类型定义

## 安装

```bash
npm install tona-utils
```

```bash
pnpm add tona-utils
```

```bash
yarn add tona-utils
```

## 使用

```typescript
import {
  isOwner,
  getLoginState,
  getCurrentPage,
  getFollowers,
  likePost,
} from 'tona-utils'
```

## 用户与认证

### `isOwner()`

检查当前用户是否为博客所有者。

```typescript
import { isOwner } from 'tona-utils'

if (isOwner()) {
  console.log('这是我的博客')
}
```

### `getLoginState()`

检查用户是否已登录。

```typescript
import { getLoginState } from 'tona-utils'

const isLoggedIn = getLoginState()
```

### `getFollowState()`

检查当前用户是否关注了博客作者。

```typescript
import { getFollowState } from 'tona-utils'

const isFollowing = getFollowState()
```

## 页面检测

### `getCurrentPage()`

检测当前页面类型。

```typescript
import { getCurrentPage } from 'tona-utils'

const page = getCurrentPage()
// 返回: 'home' | 'post' | 'tags' | 'post-archive' | 'category' | 'photos' | 'photo-view' | 'unknown'
```

### 页面类型检查

```typescript
import {
  isHomePage,
  isPostDetailsPage,
  isTagListPage,
  isCategoryPage,
  isAlbumPage,
} from 'tona-utils'

if (isHomePage()) {
  // 在博客首页
}

if (isPostDetailsPage()) {
  // 在博客文章页面
}
```

## 博客统计

```typescript
import {
  getFollowers,
  getFollowing,
  getBlogAge,
  getPostCount,
  getArticleCount,
  getCommentCount,
  getViewCount,
} from 'tona-utils'

const followers = getFollowers() // "123"
const following = getFollowing() // "45"
const age = getBlogAge() // "3年"
const posts = getPostCount() // "100"
```

## 用户操作

### `follow()` / `unfollow()`

关注或取消关注博客作者。

```typescript
import { follow, unfollow } from 'tona-utils'

follow() // 关注此博客
unfollow() // 取消关注此博客
```

### `likePost()` / `unLikePost()`

推荐或取消推荐博客文章。

```typescript
import { likePost, unLikePost } from 'tona-utils'

likePost() // 推荐此文章
unLikePost() // 取消推荐此文章
```

## URL 助手

```typescript
import {
  getIndexUrl,
  getFollowersUrl,
  getFolloweesUrl,
  getRssUrl,
  getNewPostUrl,
  getAdminUrl,
} from 'tona-utils'

const blogHome = getIndexUrl() // "https://www.cnblogs.com/username"
const followers = getFollowersUrl() // "https://home.cnblogs.com/u/username/followers"
const rss = getRssUrl() // "https://www.cnblogs.com/username/rss"
```

## 博客信息

```typescript
import {
  getCurrentBlogId,
  getCurrentBlogApp,
  getNickname,
  getBlogUserGuid,
  getSkinName,
} from 'tona-utils'

const blogId = getCurrentBlogId() // "123456"
const blogApp = getCurrentBlogApp() // "username"
const nickname = getNickname() // "博主昵称"
const guid = getBlogUserGuid() // 用户 GUID
```

## 代码高亮

```typescript
import {
  setCodeTheme,
  getCodeHighlightTheme,
  getDarkModeCodeHighlightTheme,
  checkEnableCodeLineNumber,
} from 'tona-utils'

// 设置代码主题
setCodeTheme('dark')

// 检查设置
const hasLineNumbers = checkEnableCodeLineNumber()
```

## 相关

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - 核心框架
- [tona-hooks](https://github.com/guangzan/tona/tree/main/packages/hooks) - React hooks
