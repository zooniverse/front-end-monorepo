import processTeamData from './processTeamData'
import client from '../shared/contentfulClient'
import mockResponse from './processTeamData.result.json'

export default async function createTeamResponse () {
  if (client) {
    const data = await client.getEntries({ content_type: 'person' })
    return processTeamData(data)
  } else {
    return mockResponse
  }
}
