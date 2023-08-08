import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import createPublicationsResponse from '../src/api/publications/publications.js'
import logNodeError from '../src/helpers/logger/logNodeError.js'
export { default } from '../src/screens/Publications'

export async function getStaticProps({ locale }) {
  try {
    const publicationsData = await createPublicationsResponse()
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
