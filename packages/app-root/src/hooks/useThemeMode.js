import { useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null
const storedThemeMode = localStorage?.getItem('theme')

export default function useThemeMode() {
  const [themeMode, setThemeMode] = useState(storedThemeMode)

  function toggleTheme() {
    let newTheme
    if (themeMode === 'light') {
      newTheme = 'dark'
    } else {
      newTheme = 'light'
    }

    setThemeMode(newTheme)

    // The same key is used in PFE's theme mode toggle
    localStorage?.setItem('theme', newTheme)
  }

  return { themeMode, toggleTheme }
}
