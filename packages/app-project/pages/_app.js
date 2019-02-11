import zooTheme from '@zooniverse/grommet-theme'
import { ZooFooter } from '@zooniverse/react-components'
import { Grommet } from 'grommet'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import App, { Container } from 'next/app'
import auth from 'panoptes-client/lib/auth'
import React from 'react'
import { createGlobalStyle } from 'styled-components'

import Head from '../components/Head'
import Navigation from '../components/Navigation'
import ZooHeaderWrapper from '../components/ZooHeaderWrapper'
import AuthModals from '../components/AuthModals'
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
        pageProps.initialState = getSnapshot(store)
      }
    }

    return { pageProps }
  }

  constructor (props) {
    super()
    const { isServer, initialState } = props.pageProps
    this.store = initStore(isServer, initialState, props.client)
  }

  componentDidMount () {
    this.getUser()
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

  async getUser () {
    const userResource = await auth.checkCurrent()
    if (userResource) {
      this.store.user.set(userResource)
      const { project } = getSnapshot(this.store)
      this.store.collections.fetchFavourites(project, userResource)
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
            <ZooHeaderWrapper />
            <Navigation />
            <Component {...pageProps} />
            <ZooFooter />
            <AuthModals />
          </Grommet>
        </Provider>
      </Container>
    )
  }
}

MyApp.defaultProps = {
  theme: zooTheme
}
