import { useEffect, useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null
// If no theme item in localStorage, see if the user's browser settings prefer dark mode
// If theme key is in localStorage, use that for themeMode
// The same key is used in PFE's theme mode toggle
// Use the light theme for SSR
let initialTheme = 'light'
if (isBrowser) {
  const prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  const preferredTheme = prefersDarkTheme ? 'dark' : 'light'
  initialTheme = localStorage?.getItem('theme') || preferredTheme
}

/**
A custom hook which returns a visitor's preferred theme state (dark or light) in the browser,
and a callback to set the theme state.
Defaults to light theme during SSR.
*/
export default function usePreferredTheme() {
  const [themeMode, setThemeMode] = useState('light')

  useEffect(() => {
    // useEffect will only run in the browser.
    localStorage?.setItem('theme', initialTheme)
    setThemeMode(initialTheme)
  }, [])

  return [themeMode, setThemeMode]
}
