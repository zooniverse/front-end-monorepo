'use client'

import zooTheme from '@zooniverse/grommet-theme'
import { usePanoptesUser } from '@zooniverse/react-components/hooks'
import { Grommet } from 'grommet'
import { createGlobalStyle } from 'styled-components'
import { I18nextProvider } from 'react-i18next'
import { createInstance } from 'i18next'

import { PanoptesAuthContext, ThemeModeContext } from '@/contexts'
import { useAdminMode, usePreferredTheme } from '../hooks'

import initTranslations from '@/utils/i18n'

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
  - Translations via i18next
*/
export default function PageContextProviders({ children, locale }) {
  /* i18next Provider */
  const i18n = createInstance()
  initTranslations(locale, i18n)

  /* Authenticated User / Admin Mode */
  const { data: user, error, isLoading } = usePanoptesUser()
  const { adminMode, toggleAdmin } = useAdminMode()
  const authContext = { adminMode, error, isLoading, toggleAdmin, user }

  /* Theme */
  const [themeMode, setThemeMode] = usePreferredTheme()
  function toggleTheme() {
    const newTheme = themeMode === 'light' ? 'dark' : 'light'

    setThemeMode(newTheme)
    localStorage?.setItem('theme', newTheme)
  }

  const themeContext = { themeMode, toggleTheme }

  return (
    <I18nextProvider i18n={i18n}>
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
    </I18nextProvider>
  )
}
