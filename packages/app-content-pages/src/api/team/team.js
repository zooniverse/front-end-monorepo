import processTeamData from './processTeamData'
import cache from './teamCache'
import client from '../shared/contentfulClient'

export default async function handle(req, res) {
  try {
    const data = await cache.get('teams', getData)
    res.json(data)
  } catch (error) {
    res.status(500).json({
      error: 'Error fetching data from Contentful'
    })
  }
}

async function getData () {
  const data = await client.getEntries({ content_type: 'person' })
  return processTeamData(data)
}
