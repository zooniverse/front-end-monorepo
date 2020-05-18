import createTeamResponse  from '../../api/team'
import cache from '../../api/team/teamCache'

export default async function getServerSideProps() {
  let error = null
  let teamData = []
  try {
    teamData = await cache.get('teams', createTeamResponse)
  } catch (err) {
    error = err.message
  }
  return {
    props: {
      error,
      teamData
    }
  }
}
