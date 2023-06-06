import processTeamData from './processTeamData'
import client from '../shared/contentfulClient'

export default async function createTeamResponse () {
  const data = await client.getEntries({ content_type: 'person' })
  return processTeamData(data)
}
