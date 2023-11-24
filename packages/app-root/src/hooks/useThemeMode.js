import { useState } from 'react'

export default function useThemeMode(storedThemeMode) {
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
    document.cookie = `theme=${newTheme}`
  }

  return { themeMode, toggleTheme }
}
