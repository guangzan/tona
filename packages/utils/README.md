# tona-utils

<p align="center">
  <img src="../../assets/tona.png" alt="Tona" width="100" />
</p>

<p align="center">
  Utility functions for CNBlogs theme development.
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/tona-utils"><img src="https://img.shields.io/npm/v/tona-utils?style=flat-square" alt="npm version"></a>
  <a href="LICENSE"><img src="https://img.shields.io/npm/l/tona-utils?style=flat-square" alt="license"></a>
</p>

**English** | [中文](./README.zh-CN.md)

## Features

- **Blog Context** - Detect page types, user status, and blog info
- **User Actions** - Follow, unfollow, like posts
- **URL Helpers** - Generate CNBlogs URLs
- **DOM Utilities** - jQuery-based DOM helpers
- **TypeScript Support** - Full type definitions

## Installation

```bash
npm install tona-utils
```

```bash
pnpm add tona-utils
```

```bash
yarn add tona-utils
```

## Usage

```typescript
import {
  isOwner,
  getLoginState,
  getCurrentPage,
  getFollowers,
  likePost,
} from 'tona-utils'
```

## User & Authentication

### `isOwner()`

Check if current user is the blog owner.

```typescript
import { isOwner } from 'tona-utils'

if (isOwner()) {
  console.log('This is my blog')
}
```

### `getLoginState()`

Check if user is logged in.

```typescript
import { getLoginState } from 'tona-utils'

const isLoggedIn = getLoginState()
```

### `getFollowState()`

Check if current user follows the blog author.

```typescript
import { getFollowState } from 'tona-utils'

const isFollowing = getFollowState()
```

## Page Detection

### `getCurrentPage()`

Detect current page type.

```typescript
import { getCurrentPage } from 'tona-utils'

const page = getCurrentPage()
// Returns: 'home' | 'post' | 'tags' | 'post-archive' | 'category' | 'photos' | 'photo-view' | 'unknown'
```

### Page Type Checks

```typescript
import {
  isHomePage,
  isPostDetailsPage,
  isTagListPage,
  isCategoryPage,
  isAlbumPage,
} from 'tona-utils'

if (isHomePage()) {
  // On blog home page
}

if (isPostDetailsPage()) {
  // On a blog post page
}
```

## Blog Statistics

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

## User Actions

### `follow()` / `unfollow()`

Follow or unfollow the blog author.

```typescript
import { follow, unfollow } from 'tona-utils'

follow() // Follow this blog
unfollow() // Unfollow this blog
```

### `likePost()` / `unLikePost()`

Recommend or unrecommend a blog post.

```typescript
import { likePost, unLikePost } from 'tona-utils'

likePost() // Recommend this post
unLikePost() // Unrecommend this post
```

## URL Helpers

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

## Blog Info

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
const guid = getBlogUserGuid() // User GUID
```

## Code Highlighting

```typescript
import {
  setCodeTheme,
  getCodeHighlightTheme,
  getDarkModeCodeHighlightTheme,
  checkEnableCodeLineNumber,
} from 'tona-utils'

// Set code theme
setCodeTheme('dark')

// Check settings
const hasLineNumbers = checkEnableCodeLineNumber()
```

## Related

- [tona](https://github.com/guangzan/tona/tree/main/packages/core) - Core framework
- [tona-hooks](https://github.com/guangzan/tona/tree/main/packages/hooks) - React hooks
