import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import createTeamResponse from '../src/api/team/team.js'
import logNodeError from '../src/helpers/logger/logNodeError.js'
export { default } from '../src/screens/Teams'

export async function getStaticProps({ locale }) {
  try {
    const teamData = await createTeamResponse()
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
