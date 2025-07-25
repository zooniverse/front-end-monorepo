import auth from 'panoptes-client/lib/auth'
import { useState } from 'react'

const isBrowser = typeof window !== 'undefined'

let defaultToken
/*
  See comments in https://github.com/zooniverse/front-end-monorepo/pull/6345
  Top-level await in modules has been supported in Node
  and in all browsers since 2021. However, ES modules are still
  not supported in the monorepo. An immediately-invoked async
  function is a workaround when top-level await is not supported.
  https://v8.dev/features/top-level-await
*/
(async function getDefaultToken() {
  defaultToken = null
  if (isBrowser) {
    await auth.checkCurrent()
    defaultToken = await auth.checkBearerToken()
  }
})()

export default function usePanoptesAuthToken() {
  const [token, setToken] = useState(defaultToken)

  async function fetchPanoptesAuthToken() {
    await auth.checkCurrent()
    const newToken = await auth.checkBearerToken()
    if (newToken !== token) {
      setToken(newToken)
    }
  }

  fetchPanoptesAuthToken()
  return token
}
