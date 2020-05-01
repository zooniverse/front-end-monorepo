import { createClient } from 'contentful'

const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN || 'Mock token'
const space = process.env.CONTENTFUL_SPACE_ID || 'Mock space ID'
const client = createClient({
  accessToken,
  space
})

export default client
