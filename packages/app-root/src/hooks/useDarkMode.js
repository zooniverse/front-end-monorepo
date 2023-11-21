import { useState } from 'react'

const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null
const storedDarkMode = !!localStorage?.getItem('darkMode')

export default function useDarkMode() {
  const [darkMode, setDarkMode] = useState(storedDarkMode)

  function toggleTheme() {
    let newTheme = !darkMode
    setDarkMode(newTheme)
    if (newTheme) {
      localStorage?.setItem('darkMode', true)
    } else {
      localStorage?.removeItem('darkMode')
    }
  }

  return { darkMode, toggleTheme }
}
