import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import * as mst from 'mobx-state-tree'
import App, { Container } from 'next/app'
import React from 'react'
import { createGlobalStyle } from 'styled-components'

import Head from '../components/Head'
import Navigation from '../components/Navigation'
import initStore from '../stores'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx: context }) {
    let pageProps = {
      isServer: !!context.req
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context)
    }

    if (pageProps.isServer) {
      const { owner, project } = context.query
      if (owner && project) {
        const projectSlug = `${owner}/${project}`
        const store = initStore(pageProps.isServer)
        await store.project.fetch(projectSlug)
        pageProps.initialState = mst.getSnapshot(store)
      }
    }

    return { pageProps }
  }

  constructor(props) {
    super()
    const { isServer, initialState } = props.pageProps
    this.store = initStore(isServer, initialState, props.client)
  }

  componentDidUpdate () {
    // It looks like Next.js mutates the `router` prop, so if there's a URL
    // change, we check the new slug against the slug for the current project
    // in the store.
    const { owner, project } = this.props.router.query
    const slugFromUrl = `${owner}/${project}`
    const currentSlug = this.store.project.slug
    if (currentSlug !== slugFromUrl) {
      this.store.project.fetch(slugFromUrl)
    }
  }

  render () {
    const { Component, pageProps, theme } = this.props
    return (
      <Container>
        <GlobalStyle />
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
