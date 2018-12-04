export default function getBearerToken (authClient) {
  const authToken = authClient.getToken() || {}
  if (authToken && authToken.token) return `Bearer ${authToken.token}` 

  return ''
}