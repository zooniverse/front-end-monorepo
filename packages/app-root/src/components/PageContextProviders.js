'use client'

import zooTheme from '@zooniverse/grommet-theme'
import { usePanoptesUser } from '@zooniverse/react-components/hooks'
import { Grommet } from 'grommet'
import { createGlobalStyle } from 'styled-components'

import { PanoptesAuthContext, ThemeModeContext } from '../contexts'
import { useAdminMode, usePreferredTheme } from '../hooks'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

/**
  Context for every page:
  - global page styles.
  - Zooniverse Grommet theme and themeMode.
  - Panoptes auth (user account and admin mode.)
*/
export default function PageContextProviders({ children }) {
  const [themeMode, setThemeMode] = usePreferredTheme()

  const { data: user, error, isLoading } = usePanoptesUser()
  const { adminMode, toggleAdmin } = useAdminMode()
  const authContext = { adminMode, error, isLoading, toggleAdmin, user }

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
