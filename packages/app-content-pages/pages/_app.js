import { useEffect, useState } from 'react'
import zooTheme from '@zooniverse/grommet-theme'
import { ZooFooter } from '@zooniverse/react-components'
import { Grommet } from 'grommet'
import { createGlobalStyle } from 'styled-components'
import { appWithTranslation } from 'next-i18next'
import Error from 'next/error'

import PageHeader from '../src/shared/components/PageHeader/PageHeader.js'
import { PanoptesAuthContext, ThemeModeContext } from '../src/shared/contexts'
import { usePanoptesUser } from '@zooniverse/react-components/hooks'

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

function MyApp({ Component, pageProps }) {
  const { data: user, error, isLoading } = usePanoptesUser()
  const authContext = { error, isLoading, user }

  const [themeMode, setThemeMode] = useState('light')

  useEffect(() => {
    // useEffect will only run in the browser.
    localStorage?.setItem('theme', initialTheme)
    setThemeMode(initialTheme)
  }, [])

  function toggleTheme() {
    const newTheme = themeMode === 'light' ? 'dark' : 'light'

    setThemeMode(newTheme)
    localStorage?.setItem('theme', newTheme)
  }

  const themeContext = { themeMode, toggleTheme }

  try {
    if (pageProps.statusCode) {
      return <Error statusCode={pageProps.statusCode} title={pageProps.title} />
    }

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
            <PageHeader />
            <Component {...pageProps} />
            <ZooFooter />
          </Grommet>
        </ThemeModeContext.Provider>
      </PanoptesAuthContext.Provider>
    )
  } catch (error) {
    return <Error statusCode={500} title={error.message} />
  }
}

export default appWithTranslation(MyApp)
