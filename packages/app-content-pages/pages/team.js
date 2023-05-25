import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import TeamAPI from '../src/api/team'
import logNodeError from '../src/helpers/logger/logNodeError.js'
export { default } from '../src/screens/Team'

export async function getStaticProps({ locale }) {
  try {
    const teamData = await TeamAPI.createTeamResponse()
    return {
      props: {
        teamData,
        ...(await serverSideTranslations(locale, ['components']))
      },
      revalidate: 60 * 60 * 1 // 1 hour
    }
  } catch (error) {
    logNodeError(error)
    throw error
  }
}
