import zooTheme from '@zooniverse/grommet-theme'
import { ZooFooter } from '@zooniverse/react-components'
import { Grommet, base } from 'grommet'
import { createGlobalStyle } from 'styled-components'
import { appWithTranslation } from 'next-i18next'
import merge from 'lodash/merge'

import PageHeader from '../src/shared/components/PageHeader/PageHeader.js'
import { PanoptesAuthContext } from '../src/shared/contexts'
import { usePanoptesUser } from '@zooniverse/react-components/hooks'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

function MyApp({ Component, pageProps }) {
  const mergedThemes = merge({}, base, zooTheme)
  const { data: user, error, isLoading } = usePanoptesUser()
  const authContext = { error, isLoading, user }

  return (
    <PanoptesAuthContext.Provider value={authContext}>
      <GlobalStyle />
      <Grommet theme={mergedThemes}>
        <PageHeader />
        <Component {...pageProps} />
        <ZooFooter />
      </Grommet>
    </PanoptesAuthContext.Provider>
  )
}

export default appWithTranslation(MyApp)
