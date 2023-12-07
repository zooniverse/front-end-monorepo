import { createClient } from 'contentful'

let client = null
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN
const space = process.env.CONTENTFUL_SPACE_ID

if (accessToken && space) {
  console.log('TOKEN', accessToken)
  client = createClient({
    accessToken,
    space
  })
}

export default client
