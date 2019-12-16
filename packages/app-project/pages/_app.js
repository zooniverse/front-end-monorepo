import { ZooFooter } from '@zooniverse/react-components'
import { Box } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
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
  static async getInitialProps ({ Component, router, ctx: context }) {
    let pageProps = {
      host: generateHostUrl(context),
      isServer: !!context.req,
      query: context.query
    }

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(context)
    }

    if (pageProps.isServer) {
      // cookie is in the next.js context req object
      const mode = getCookie(context, 'mode') || undefined
      const dismissedAnnouncementBanner = getCookie(context, 'dismissedAnnouncementBanner') || undefined
      const snapshot = {
        config: {
          apiHostUrl: process.env.API_HOST_URL,
          clientAppID: process.env.CLIENT_APP_ID
        },
        ui: {
          dismissedAnnouncementBanner,
          mode
        }
      }
      const store = initStore(pageProps.isServer, snapshot)
      // console.info(getSnapshot(store))
      // store.auth.createClient()
      // const f = await store.auth.client.resumeSession()
      // console.info(f)

      const { owner, project } = context.query
      if (owner && project) {
        const projectSlug = `${owner}/${project}`
        const query = (context.query.env) ? { env: context.query.env } : {}
        await store.project.fetch(projectSlug, query)
      }

      pageProps.initialState = getSnapshot(store)
    }

    return { pageProps }
  }

  constructor (props) {
    super()
    const { isServer, initialState } = props.pageProps
    console.info(initialState)
    this.store = initStore(isServer, initialState, props.client)
    makeInspectable(this.store)
  }

  componentDidMount () {
    console.info(`Deployed commit is ${process.env.COMMIT_ID}`)
    // this.store.user.checkCurrent()
    this.store.auth.createClient()
    // console.info(getSnapshot(this.store))

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
              <Box background={{
                dark: 'dark-1',
                light: 'light-1'
              }}>
                <Component {...pageProps} />
              </Box>
              <ZooFooter />
              <AuthModal />
            </GrommetWrapper>
          </MediaContextProvider>
        </Provider>
      </>
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
