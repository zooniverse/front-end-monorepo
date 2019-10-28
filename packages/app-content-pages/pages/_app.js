import zooTheme from '@zooniverse/grommet-theme'
import { ZooFooter } from '@zooniverse/react-components'
import { Grommet, base } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import App from 'next/app'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import merge from 'lodash/merge'

import { initializeLogger, logReactError } from '../src/helpers/logger'
import AuthModals from '../src/shared/components/AuthModals'
import ZooHeaderWrapper from '../src/shared/components/ZooHeaderWrapper'
import initStore from '../src/shared/stores'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
initializeLogger()

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx: context }) {
    const isServer = !!context.req
    const store = initStore(isServer)

    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context, store)
    }

    return {
      initialState: getSnapshot(store),
      isServer,
      pageProps
    }
  }

  constructor (props) {
    super(props)
    const { isServer, initialState } = props
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
    const { Component, pageProps, theme } = this.props
    const mergedThemes = merge({}, base, theme)
    return (
      <>
        <GlobalStyle />
        <Provider store={this.store}>
          <Grommet theme={mergedThemes}>
            <ZooHeaderWrapper />
            <Component {...pageProps} />
            <ZooFooter />
            <AuthModals />
          </Grommet>
        </Provider>
      </>
    )
  }
}

MyApp.defaultProps = {
  theme: zooTheme
}
