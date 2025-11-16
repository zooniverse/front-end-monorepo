import { enableStaticRendering, Provider } from 'mobx-react'
import Error from 'next/error'
import { useEffect, useMemo } from 'react'
import { createGlobalStyle } from 'styled-components'
import { appWithTranslation } from 'next-i18next'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'
import 'ol/ol.css'

import Head from '@components/Head'
import { addSentryUser, logToSentry } from '@helpers/logger'
import { usePanoptesUser, usePreferredTheme, useSugarProject, useUserFavourites } from '@hooks'
import initStore from '@stores'
import ThemeModeContext from '@shared/contexts/ThemeModeContext.js'

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
  }
`

enableStaticRendering(typeof window === 'undefined')

/**
  useStore hook adapted from
  https://github.com/vercel/next.js/blob/5201cdbaeaa72b54badc8f929ddc73c09f414dc4/examples/with-mobx-state-tree/store.js#L49-L52
*/
function useStore(initialState) {
  const isServer = typeof window === 'undefined'
  const store = useMemo(
    () => initStore(isServer, initialState),
    [isServer, initialState]
  )
  return store
}

function MyApp({ Component, pageProps }) {
  /* Handle the theme mode */
  const [themeMode, setThemeMode] = usePreferredTheme()

  function toggleTheme() {
    const newTheme = themeMode === 'light' ? 'dark' : 'light'

    setThemeMode(newTheme)
    localStorage?.setItem('theme', newTheme)
  }

  const themeContext = { themeMode, toggleTheme }

  /* Initialize the mobx store */
  const { initialState } = pageProps
  const store = useStore(initialState)

  useEffect(
    function onMount() {
      console.info(`Deployed commit is ${process.env.COMMIT_ID}`)
      store.ui.readCookies() // reads if announcement banner has been dismissed by user
    },
    [store.ui]
  )

  const userKey = store.user?.id || 'no-user'
  const user = usePanoptesUser(userKey)
  const project = store.project
  const favourites = useUserFavourites({ user, project })
  useSugarProject(project)

  useEffect(
    function onUserChange() {
      if (user?.id) {
        store.user.set(user)
      }
      // logged-out users are null
      if (user === null) {
        store.user.clear()
      }
      addSentryUser(user)
    },
    [user, store.user]
  )

  useEffect(
    function onFavouritesChange() {
      if (favourites?.id) {
        store.user.collections.setFavourites(favourites)
      }
      // favourites are null by default.
      if (favourites === null) {
        store.user.collections.setFavourites(null)
      }
    },
    [favourites, store.user]
  )

  try {
    if (pageProps.statusCode) {
      return <Error statusCode={pageProps.statusCode} title={pageProps.title} />
    }

    return (
      <>
        <GlobalStyle />
        <Provider store={store}>
          <ThemeModeContext.Provider value={themeContext}>
            <Grommet
              background={{
                dark: 'dark-1',
                light: 'light-1'
              }}
              theme={zooTheme}
              themeMode={themeMode}
            >
              <Head host={pageProps.host} pageTitle={pageProps.pageTitle} />
              <Component {...pageProps} />
            </Grommet>
          </ThemeModeContext.Provider>
        </Provider>
      </>
    )
  } catch (error) {
    logToSentry(error)
    return <Error statusCode={500} title={error.message} />
  }
}

export default appWithTranslation(MyApp)
