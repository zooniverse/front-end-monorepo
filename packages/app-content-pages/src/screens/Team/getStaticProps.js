import TeamAPI  from '../../api/team'
import { logNodeError } from '../../helpers/logger'

export default async function getStaticProps() {
  try {
    const  teamData = await TeamAPI.createTeamResponse()
    return {
      props: {
        teamData
      },
      unstable_revalidate: 60 * 60 * 1
    }
  } catch (error) {
    logNodeError(error)
    throw error
  }
}
