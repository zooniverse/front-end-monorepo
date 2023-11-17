'use client'

import zooTheme from '@zooniverse/grommet-theme'
import { usePanoptesUser } from '@zooniverse/react-components/hooks'
import { Grommet } from 'grommet'
import { createGlobalStyle } from 'styled-components'

import { PanoptesAuthContext } from '../contexts'
import { useAdminMode } from '../hooks'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

/**
  Context for every page:
  - global page styles.
  - Zooniverse Grommet theme.
  - Panoptes auth (user account and admin mode.)
*/
export default function PageContextProviders({ children }) {
  const { data: user, error, isLoading } = usePanoptesUser()
  const { adminMode, toggleAdmin } = useAdminMode(user)
  const authContext = { adminMode, error, isLoading, toggleAdmin, user }

  return (
    <PanoptesAuthContext.Provider value={authContext}>
      <GlobalStyle />
      <Grommet
        background={{
          dark: 'dark-1',
          light: 'light-1'
        }}
        theme={zooTheme}
      >
        {children}
      </Grommet>
    </PanoptesAuthContext.Provider>
  )

}