import { Box } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import App from 'next/app'
import React from 'react'
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

export default class MyApp extends App {
  constructor (props) {
    super()
    const { isServer, initialState } = props.pageProps
    this.store = initStore(isServer, initialState, props.client)
    makeInspectable(this.store)
  }

  componentDidMount () {
    console.info(`Deployed commit is ${process.env.COMMIT_ID}`)
    this.store.user.checkCurrent()
  }

  componentDidCatch (error, errorInfo) {
    logReactError(error, errorInfo)
    super.componentDidCatch(error, errorInfo)
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <>
        <GlobalStyle />
        <Provider store={this.store}>
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
  }
}

