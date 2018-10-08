import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import App, { Container } from 'next/app'
import React from 'react'

import Head from '../components/Head'
import Navigation from '../components/Navigation'

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx: context }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context)
    }

    return { pageProps }
  }

  render () {
    const { Component, pageProps, theme } = this.props
    return (
      <Container>
        <Grommet theme={theme}>
          <Head />
          <Navigation />
          <Component {...pageProps} />
        </Grommet>
      </Container>
    )
  }
}

MyApp.defaultProps = {
  theme: zooTheme
}
