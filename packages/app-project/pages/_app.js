import { Box } from 'grommet'
import makeInspectable from 'mobx-devtools-mst'
import { Provider } from 'mobx-react'
import Error from 'next/error'
import { useEffect, useMemo } from 'react'
import { createGlobalStyle } from 'styled-components'
import { appWithTranslation } from 'next-i18next'

import AuthModal from '@components/AuthModal'
import getCookie from '@helpers/getCookie'
import GrommetWrapper from '@helpers/GrommetWrapper'
import Head from '@components/Head'
import { initializeLogger, logToSentry } from '@helpers/logger'
import { usePanoptesUser, useUserFavourites } from '@hooks'
import { MediaContextProvider } from '@shared/components/Media'
import initStore from '@stores'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

initializeLogger()

/**
  useStore hook adapted from
  https://github.com/vercel/next.js/blob/5201cdbaeaa72b54badc8f929ddc73c09f414dc4/examples/with-mobx-state-tree/store.js#L49-L52
*/
function useStore(initialState) {
  const isServer = typeof window === 'undefined'
  const store = useMemo(() => initStore(isServer, initialState), [isServer, initialState])
  return store
}

function MyApp({ Component, pageProps }) {
  const { initialState } = pageProps
  const store = useStore(initialState)
  makeInspectable(store)

  function onMount() {
    console.info(`Deployed commit is ${process.env.COMMIT_ID}`)
    store.ui.readCookies()
  }
  useEffect(onMount, [])

  const userKey = store.user?.id || 'no-user'
  const user = usePanoptesUser(userKey)
  const project = store.project
  const favourites = useUserFavourites({ user, project })

  useEffect( function onUserChange() {
    if (user?.id) {
      store.user.set(user)
    }
    // logged-out users are null
    if (user === null) {
      store.user.clear()
    }
  }, [user])

  useEffect( function onFavouritesChange() {
    if (favourites?.id) {
      store.user.collections.setFavourites(favourites)
    }
    // favourites are null by default.
    if (favourites === null) {
      store.user.collections.setFavourites(null)
    }
  }, [favourites])

  try {
    if (pageProps.statusCode) {
      return (
        <Error
          statusCode={pageProps.statusCode}
          title={pageProps.title}
        />
      )
    }

    return (
      <>
        <GlobalStyle />
        <Provider store={store}>
          <MediaContextProvider>
            <GrommetWrapper>
              <Head host={pageProps.host} pageTitle={pageProps.pageTitle} />
              <Box>
                <Component {...pageProps} />
              </Box>
              <AuthModal />
            </GrommetWrapper>
          </MediaContextProvider>
        </Provider>
      </>
    )
  } catch (error) {
    logToSentry(error)
    return <Error statusCode={500} title={error.message} />
  }
}

export default appWithTranslation(MyApp)
