export default async function getBearerToken (authClient) {
  let token = ''
  if (authClient) {
    try {
      const authToken = await authClient.checkBearerToken()
      // API method between PJC's auth and oauth clients are inconsistent.
      // First party auth client returns a string of the bearer token
      // Oauth client returns an object of the bearer token, expiration, and token type
      if (typeof authToken === 'string' && authToken) token = authToken

      if (authToken && authToken.access_token) token = authToken.access_token

      if (token) return `Bearer ${token}`
      return token
    } catch (error) {
      console.error('Cannot check bearer token:', error)
    }
  }

  return token
}
