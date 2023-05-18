import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PublicationsAPI from '../src/api/publications'
import logNodeError from '../src/helpers/logger/logNodeError.js'
export { default } from '../src/screens/Publications'

export async function getStaticProps({ locale }) {
  try {
    const publicationsData = await PublicationsAPI.createPublicationsResponse()
    return {
      props: {
        publicationsData,
        ...(await serverSideTranslations(locale, ['components']))
      },
      revalidate: 60 * 60 * 1 // 1 hour
    }
  } catch (error) {
    logNodeError(error)
    throw error
  }
}
