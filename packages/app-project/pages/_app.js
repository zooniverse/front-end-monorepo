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
    let pageProps = {
      host: generateHostUrl(context),
      isServer: !!context.req
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context)
    }

    if (pageProps.isServer) {
      // cookie is in the next.js context req object
      const mode = getCookie(context, 'mode') || undefined
      const store = initStore(pageProps.isServer, {
        ui: {
          mode
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

  componentDidCatch (error, errorInfo) {
    logReactError(error, errorInfo)
    super.componentDidCatch(error, errorInfo)
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
            <AuthModal />
          </GrommetWrapper>
        </Provider>
      </Container>
    )
  }
}

function generateHostUrl (context) {
  if (context.req) {
    const { connection, headers } = context.req
    const protocol = connection.encrypted ? 'https' : 'http'
    return `${protocol}://${headers.host}`
  } else {
    return location.origin
  }
}
