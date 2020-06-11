import createTeamResponse  from '../../api/team'
import cache from '../../api/team/teamCache'

export default async function getStaticProps() {
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
    },
    unstable_revalidate: 60 * 60 * 1
  }
}
