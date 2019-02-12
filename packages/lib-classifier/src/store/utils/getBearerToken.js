export default async function getBearerToken (authClient) {
  if (authClient) {
    const authToken = await authClient.checkBearerToken() || ''
    if (authToken && authToken.access_token) {
      return `Bearer ${authToken.access_token}`
    }
  }

  return Promise.resolve('')
}
