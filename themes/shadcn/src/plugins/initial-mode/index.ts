export const initialMode = () => {
  try {
    const savedTheme = localStorage.getItem('theme')
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches
    const resolvedTheme =
      savedTheme === 'dark' || savedTheme === 'light'
        ? savedTheme
        : prefersDark
          ? 'dark'
          : 'light'
    const root = document.documentElement
    root.classList.toggle('dark', resolvedTheme === 'dark')
    root.classList.toggle('light', resolvedTheme === 'light')
    root.style.setProperty('color-scheme', resolvedTheme)
  } catch {
    // Ignore localStorage or matchMedia access errors.
  }
}
