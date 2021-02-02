import { Box } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import Error from 'next/error'
import React, { useEffect, useState } from 'react'
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

export default function MyApp({ Component, client, pageProps }) {
  try {
    const { initialState } = pageProps
    const [ isServer, setIsServer ] = useState(true)
    const store = initStore(isServer, initialState, client)
    makeInspectable(store)

    function onMount() {
      console.info(`Deployed commit is ${process.env.COMMIT_ID}`)
      store.user.checkCurrent()
      setIsServer(false)
    }
    useEffect(onMount, [])

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

