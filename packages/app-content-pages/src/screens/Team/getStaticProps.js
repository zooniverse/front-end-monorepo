import TeamAPI  from '../../api/team'

export default async function getStaticProps() {
  let error = null
  let teamData = []
  try {
    teamData = await TeamAPI.createTeamResponse()
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
