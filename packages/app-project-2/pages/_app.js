import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import * as mst from 'mobx-state-tree'
import App, { Container } from 'next/app'
import React from 'react'

import Head from '../components/Head'
import Navigation from '../components/Navigation'
import initStore from '../stores'

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx: context }) {

    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context)
    }

    if (pageProps.isServer) {
      const isServer = !!context.req
      const store = initStore(isServer)
      const slug = context.req.url
      // await store.project.fetch(slug)
      pageProps.initialState = mst.getSnapshot(store)
    }

    return { pageProps }
  }

  constructor(props) {
    super()
    const { isServer, initialState } = props.pageProps
    this.store = initStore(isServer, initialState, props.client)
  }

  render () {
    console.info(this.props)
    const { Component, pageProps, theme } = this.props
    return (
      <Container>
        <Provider store={this.store}>
          <Grommet theme={theme}>
            <Head />
            <Navigation />
            <Component {...pageProps} />
          </Grommet>
        </Provider>
      </Container>
    )
  }
}

MyApp.defaultProps = {
  theme: zooTheme
}
