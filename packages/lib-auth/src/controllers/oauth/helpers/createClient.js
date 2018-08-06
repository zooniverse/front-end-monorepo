import ClientOAuth2 from 'client-oauth2'

import { authorizationUriMap } from '../../../config'

function getAuthUri (authorizationUri, env) {
  if (authorizationUri) {
    return authorizationUri
  }

  if (authorizationUriMap[env]) {
    return authorizationUriMap[env]
  }

  throw new Error('You must pass either an `authorizationUri` or `env` argument when creating a client.')
}

function createClient ({
  authorizationUri = null,
  clientId = null,
  env = null,
  redirectUri,
  scopes = [
    'public',
    'user'
  ]
} = {}) {
  const canonicalAuthUri = getAuthUri(authorizationUri, env)
  const client = new ClientOAuth2({
    authorizationUri: canonicalAuthUri,
    clientId,
    redirectUri,
    scopes
  })
  return client
}

export default createClient
