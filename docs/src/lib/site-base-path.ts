const ROOT_PATH = '/'

function normalizeBasePath(baseUrl: string): string {
  const trimmedBaseUrl = baseUrl.trim()

  if (trimmedBaseUrl.length === 0 || trimmedBaseUrl === ROOT_PATH) {
    return ROOT_PATH
  }

  const path = trimmedBaseUrl.replace(/^\/+|\/+$/g, '')

  if (path.length === 0) {
    return ROOT_PATH
  }

  return `/${path}`
}

export const siteBasePath = normalizeBasePath(import.meta.env.BASE_URL)
