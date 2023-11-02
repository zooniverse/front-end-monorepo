import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import createPublicationsResponse from '../src/api/publications/publications.js'
import logNodeError from '../src/helpers/logger/logNodeError.js'
export { default } from '../src/screens/Publications'

export async function getStaticProps({ locale }) {
  try {
    const publicationsData = await createPublicationsResponse()

    // For rendering linked h2's
    publicationsData.forEach(category => (
      category.slug = category.title.toLowerCase().replaceAll(' ', '-')
    ))

    // For building the sidebar
    const sections = publicationsData.map(category => ({
      name: category.title,
      slug: category.title.toLowerCase().replaceAll(' ', '-')
    }))

    return {
      props: {
        publicationsData,
        sections,
        ...(await serverSideTranslations(locale, ['components']))
      },
      revalidate: 60 * 60 * 1 // 1 hour
    }
  } catch (error) {
    logNodeError(error)
    throw error
  }
}
