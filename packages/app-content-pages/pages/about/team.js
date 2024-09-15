import createTeamResponse from '../../src/api/team/team.js'
import { OurTeam } from '@zooniverse/content'

export default OurTeam

export async function getStaticProps() {
  try {
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

    return {
      props: {
        sections,
        teamData,
      },
      revalidate: 60 * 60 * 1 // 1 hour
    }
  } catch (error) {
    throw error
  }
}
