'use client'

import { useEffect, useState } from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { usePanoptesUser } from '@zooniverse/react-components/hooks'
import { Grommet } from 'grommet'
import { createGlobalStyle } from 'styled-components'

import { PanoptesAuthContext, ThemeModeContext } from '../contexts'
import { useAdminMode } from '../hooks'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
const isBrowser = typeof window !== 'undefined'
const localStorage = isBrowser ? window.localStorage : null
// If no theme item in localStorage, see if the user's browser settings prefer dark mode
// If theme key is in localStorage, use that for themeMode
// The same key is used in PFE's theme mode toggle
// Use the light theme for SSR
let initialTheme = 'light'
let prefersDarkTheme = false
if (isBrowser) {
  prefersDarkTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  const preferredTheme = prefersDarkTheme ? 'dark' : 'light'
  initialTheme = localStorage?.getItem('theme') || preferredTheme
}

/**
  Context for every page:
  - global page styles.
  - Zooniverse Grommet theme and themeMode.
  - Panoptes auth (user account and admin mode.)
*/
export default function PageContextProviders({ children }) {
  const [themeMode, setThemeMode] = useState('light')

  const { data: user, error, isLoading } = usePanoptesUser()
  const { adminMode, toggleAdmin } = useAdminMode(user)
  const authContext = { adminMode, error, isLoading, toggleAdmin, user }

  useEffect(() => {
    // useEffect will only run in the browser.
    if (!localStorage?.getItem('theme') ) {
      if (prefersDarkTheme) {
        localStorage?.setItem('theme', 'dark')
      }
    }
    setThemeMode(initialTheme)
  }, [])

  function toggleTheme() {
    const newTheme = (themeMode === 'light') ? 'dark' : 'light'

    setThemeMode(newTheme)
    localStorage?.setItem('theme', newTheme)
  }

  const themeContext = { themeMode, toggleTheme }

  return (
    <PanoptesAuthContext.Provider value={authContext}>
      <ThemeModeContext.Provider value={themeContext}>
        <GlobalStyle />
        <Grommet
          background={{
            dark: 'dark-1',
            light: 'light-1'
          }}
          theme={zooTheme}
          themeMode={themeMode}
        >
          {children}
        </Grommet>
      </ThemeModeContext.Provider>
    </PanoptesAuthContext.Provider>
  )
}
