import { OurTeam } from '@zooniverse/content'

import processTeamData from './processTeamData'
import client from '@/utils/contentfulClient.js'
import mockResponse from './response.mock.json'

export const metadata = {
  title: 'Our Team',
  description: 'The people who make the Zooniverse'
}

// Force this route segment to be statically generated even though part of its route is the dynamic [locale].
export const dynamic = 'force-static'
export const revalidate = 3600 // revalidate the page build at most every hour

// Return a list of `params` to populate the [locale] dynamic segment and prerender this page.
// Because locale switching isn't enabled yet in the UI, just statically render 'en' route for now.
export async function generateStaticParams() {
  return [{ locale: 'en' }]
}

// If the `locale` param !== 'en', generate the page at runtime.
// This might be refactored in the future when upgrading to Next.js 16
// and/or launching locale switching on app-root pages.
export const dynamicParams = true

// This route is static, so the output of the request will be cached and revalidated as part of the route segment.
async function createTeamResponse() {
  if (client) {
    try {
      const data = await client.getEntries({ content_type: 'person' })
      return processTeamData(data)
    } catch (error) {
      console.error(error)
      return mockResponse
    }
  } else {
    return mockResponse
  }
}

export default async function TeamPage() {
  const teamData = await createTeamResponse()

  // For rendering linked h2's
  teamData?.forEach(team => {
    team.slug = team.name?.toLowerCase().replaceAll(' ', '-')
  })

  // For building the sidebar
  const sections = teamData?.map(team => ({
    name: team.name,
    slug: team.name?.toLowerCase().replaceAll(' ', '-')
  }))

  return <OurTeam sections={sections} teamData={teamData} />
}
