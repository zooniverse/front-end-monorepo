import zooTheme from '@zooniverse/grommet-theme'
import { ZooFooter } from '@zooniverse/react-components'
import { Grommet, base } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import { getSnapshot } from 'mobx-state-tree'
import App from 'next/app'
import { createGlobalStyle } from 'styled-components'
import merge from 'lodash/merge'

import { initializeLogger, logReactError } from '../src/helpers/logger'
import AuthModal from '../src/shared/components/AuthModal'
import ZooHeaderWrapper from '../src/shared/components/ZooHeaderWrapper'
import initStore from '../src/shared/stores'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`
initializeLogger()

export default class MyApp extends App {
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
            <AuthModal />
          </Grommet>
        </Provider>
      </>
    )
  }
}

MyApp.defaultProps = {
  theme: zooTheme
}
