import { ZooFooter } from '@zooniverse/react-components'
import { Box } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import App, { Container } from 'next/app'
import cookies from 'next-cookies'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import UrlParse from 'url-parse'

import AuthModals from '../src/components/AuthModals'
import GrommetWrapper from '../src/helpers/GrommetWrapper'
import Head from '../src/components/Head'
import ProjectHeader from '../src/components/ProjectHeader'
import ZooHeaderWrapper from '../src/components/ZooHeaderWrapper'
import initStore from '../stores'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx: context }) {
    let pageProps = {
      host: generateHostUrl(context),
      isServer: !!context.req
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context)
    }

    if (pageProps.isServer) {
      const store = initStore(pageProps.isServer, {
        ui: {
          mode: cookies(context).mode
        }
      })

      const { owner, project } = context.query
      if (owner && project) {
        const projectSlug = `${owner}/${project}`
        const query = (context.query.env) ? { env: context.query.env } : {}
        await store.project.fetch(projectSlug, query)
        pageProps.initialState = getSnapshot(store)
      }
    }

    return { pageProps }
  }

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

  componentDidUpdate () {
    // Next.js mutates the router, so we can't compare the previous `asPath` to
    // the current one. Instead, we check the URL against the slug for the
    // active project in the store.
    const slugFromUrl = getSlugFromUrl(this.props.router.asPath)
    const currentSlug = this.store.project.slug

    if (slugFromUrl && currentSlug !== slugFromUrl) {
      this.store.project.fetch(slugFromUrl)
    }
  }

  render () {
    const { Component, pageProps } = this.props
    return (
      <Container>
        <GlobalStyle />
        <Provider store={this.store}>
          <GrommetWrapper>
            <Head host={pageProps.host} />
            <ZooHeaderWrapper />
            <ProjectHeader />
            <Box background={{
              dark: 'dark-1',
              light: 'light-1'
            }}>
              <Component {...pageProps} />
            </Box>
            <ZooFooter />
            <AuthModals />
          </GrommetWrapper>
        </Provider>
      </Container>
    )
  }
}

function getSlugFromUrl (relativeUrl) {
  const fragments = new UrlParse(relativeUrl).pathname.split('/')
  return (fragments[2] && fragments[3])
    ? `${fragments[2]}/${fragments[3]}`
    : undefined
}

function generateHostUrl (context) {
  const { connection, headers } = context.req
  const protocol = connection.encrypted ? 'https' : 'http'
  return `${protocol}://${headers.host}`
}
