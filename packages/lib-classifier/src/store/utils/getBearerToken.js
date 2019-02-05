export default async function getBearerToken (authClient) {
  if (authClient) {
    const authToken = await authClient.getBearerToken() || {}
    if (authToken && authToken.token) {
      return `Bearer ${authToken.token}`
    }
  }

  return ''
}
