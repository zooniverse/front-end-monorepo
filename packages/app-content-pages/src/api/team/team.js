import processTeamData from './processTeamData'
import cache from './teamCache'
import client from '../shared/contentfulClient'

export default async function getData () {
  const data = await client.getEntries({ content_type: 'person' })
  return processTeamData(data)
}
