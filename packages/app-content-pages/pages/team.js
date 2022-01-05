import TeamAPI from '../src/api/team'
import { logNodeError } from '../src/helpers/logger'
export { default } from '../src/screens/Team'

export async function getStaticProps() {
  try {
    const teamData = await TeamAPI.createTeamResponse()
    return {
      props: {
        teamData
      },
      revalidate: 60 * 60 * 1
    }
  } catch (error) {
    logNodeError(error)
    throw error
  }
}
