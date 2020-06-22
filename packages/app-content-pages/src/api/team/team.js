import processTeamData from './processTeamData'
import client from '../shared/contentfulClient'

async function createTeamResponse () {
  const data = await client.getEntries({ content_type: 'person' })
  return processTeamData(data)
}

export default { createTeamResponse }
