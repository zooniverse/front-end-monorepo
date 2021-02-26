import { Box } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import Error from 'next/error'
import React, { useEffect, useMemo } from 'react'
import { createGlobalStyle } from 'styled-components'

import AuthModal from '@components/AuthModal'
import getCookie from '@helpers/getCookie'
import GrommetWrapper from '@helpers/GrommetWrapper'
import Head from '@components/Head'
import { initializeLogger, logReactError } from '@helpers/logger'
import { MediaContextProvider } from '@shared/components/Media'
import initStore from '@stores'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

initializeLogger()

/**
  useStore hook adapted from
  https://github.com/vercel/next.js/blob/5201cdbaeaa72b54badc8f929ddc73c09f414dc4/examples/with-mobx-state-tree/store.js#L49-L52
*/
function useStore(initialState) {
  const isServer = typeof window === 'undefined'
  const store = useMemo(() => initStore(isServer, initialState), [isServer, initialState])
  return store
}

export default function MyApp({ Component, pageProps }) {
  try {
    const { initialState } = pageProps
    const store = useStore(initialState)
    makeInspectable(store)

    function onMount() {
      console.info(`Deployed commit is ${process.env.COMMIT_ID}`)
      store.user.checkCurrent()
    }
    useEffect(onMount, [])
    
    if (pageProps.statusCode) {
      return (
        <Error
          statusCode={pageProps.statusCode}
          title={pageProps.title}
        />
      )
    }

    return (
      <>
        <GlobalStyle />
        <Provider store={store}>
          <MediaContextProvider>
            <GrommetWrapper>
              <Head host={pageProps.host} />
              <Box>
                <Component {...pageProps} />
              </Box>
              <AuthModal />
            </GrommetWrapper>
          </MediaContextProvider>
        </Provider>
      </>
    )
  } catch (error) {
    logReactError(error)
    return <Error statusCode={500} title={error.message} />
  }
}

