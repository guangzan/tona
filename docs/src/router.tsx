import { createRouter as createTanStackRouter } from '@tanstack/react-router'
import { NotFound } from '@/components/not-found'
import { siteBasePath } from '@/lib/site-base-path'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  return createTanStackRouter({
    routeTree,
    basepath: siteBasePath,
    defaultPreload: 'intent',
    scrollRestoration: true,
    defaultNotFoundComponent: NotFound,
  })
}
