import { ZooFooter } from '@zooniverse/react-components'
import { Box } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import App, { Container } from 'next/app'
import React from 'react'
import { createGlobalStyle } from 'styled-components'
import UrlParse from 'url-parse'

import AuthModal from '../src/components/AuthModal'
import getCookie from '../src/helpers/getCookie'
import GrommetWrapper from '../src/helpers/GrommetWrapper'
import Head from '../src/components/Head'
import ProjectHeader from '../src/components/ProjectHeader'
import ZooHeaderWrapper from '../src/components/ZooHeaderWrapper'
import { initializeLogger, logReactError } from '../src/helpers/logger'
import initStore from '../stores'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

initializeLogger()

export default class MyApp extends App {
  static async getInitialProps ({ Component, router, ctx: context }) {
    const initialProps = {
      host: generateHostUrl(context),
      isServer: detectIfServer(context)
    }

    if (initialProps.isServer) {
      // cookie is in the next.js context req object
      const mode = getCookie(context, 'mode') || undefined
      const store = initStore(initialProps.isServer, {
        ui: {
          mode
        }
      })

      const { owner, project } = context.query
      if (owner && project) {
        const projectSlug = `${owner}/${project}`
        const query = (context.query.env) ? { env: context.query.env } : {}
        await store.project.fetch(projectSlug, query)
        initialProps.initialState = getSnapshot(store)
      }
    }

    return initialProps
  }

  constructor (props) {
    super()
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
    const { Component, host } = this.props
    return (
      <Container>
        <GlobalStyle />
        <Provider store={this.store}>
          <GrommetWrapper>
            <Head host={host} />
            <ZooHeaderWrapper />
            <ProjectHeader />
            <Box background={{
              dark: 'dark-1',
              light: 'light-1'
            }}>
              <Component {...this.props} />
            </Box>
            <ZooFooter />
            <AuthModal />
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
  const isServer = detectIfServer(context)
  let host

  if (isServer) {
    const { connection, headers } = context.req
    const protocol = connection.encrypted ? 'https' : 'http'
    host = `${protocol}://${headers.host}`
  } else {
    host = window.location.origin
  }

  return host
}

function detectIfServer (context) {
  return !!context.req
}
