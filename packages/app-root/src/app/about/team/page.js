import { OurTeam } from '@zooniverse/content'

import processTeamData from './processTeamData'
import client from '../../../utils/contentfulClient.js'
import mockResponse from './processTeamData.result.json'

export const metadata = {
  title: 'Our Team',
  description: 'The people who make the Zooniverse'
}

// This route is static, so the output of the request will be cached and revalidated as part of the route segment.
async function createTeamResponse () {
  if (client) {
    const data = await client.getEntries({ content_type: 'person' })
    return processTeamData(data)
  } else {
    return mockResponse
  }
}

export const revalidate = 3600 // revalidate the data at most every hour

export default async function TeamPage() {
  const teamData = await createTeamResponse()

    // For rendering linked h2's
    teamData?.forEach(team => {
      team.slug = team.name.toLowerCase().replaceAll(' ', '-')
    })

    // For building the sidebar
    const sections = teamData?.map(team => ({
      name: team.name,
      slug: team.name.toLowerCase().replaceAll(' ', '-')
    }))

  return <OurTeam sections={sections} teamData={teamData} />
}
