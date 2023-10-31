import zooTheme from '@zooniverse/grommet-theme'
import { ZooFooter } from '@zooniverse/react-components'
import { Grommet, base } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { enableStaticRendering, Provider } from 'mobx-react'
import { createGlobalStyle } from 'styled-components'
import merge from 'lodash/merge'
import Error from 'next/error'
import { useEffect, useMemo } from 'react'
import { appWithTranslation } from 'next-i18next'

import { logReactError } from '../src/helpers/logger'
import AuthModal from '../src/shared/components/AuthModal'
import ZooHeaderWrapper from '../src/shared/components/ZooHeaderWrapper'
import initStore from '../src/shared/stores'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

enableStaticRendering(typeof window === 'undefined')

function useStore(initialState) {
  const isServer = typeof window === 'undefined'
  const store = useMemo(
    () => initStore(isServer, initialState),
    [isServer, initialState]
  )
  return store
}

function MyApp({ Component, initialState, pageProps }) {
  const mergedThemes = merge({}, base, zooTheme)
  const store = useStore(initialState)
  makeInspectable(store)

  useEffect(() => {
    store.user.checkCurrent()
  }, [store.user])

  try {
    if (pageProps.statusCode) {
      return <Error statusCode={pageProps.statusCode} title={pageProps.title} />
    }

    return (
      <>
        <GlobalStyle />
        <Provider store={store}>
          <Grommet theme={mergedThemes}>
            <header>
              <ZooHeaderWrapper />
            </header>
            <main>
              <Component {...pageProps} />
            </main>
            <ZooFooter />
            <AuthModal />
          </Grommet>
        </Provider>
      </>
    )
  } catch (error) {
    logReactError(error)
    return <Error statusCode={500} title={error.message} />
  }
}

export default appWithTranslation(MyApp)
