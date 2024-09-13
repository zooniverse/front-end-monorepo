import createPublicationsResponse from '../../src/api/publications/publications.js'
import { Publications } from '@zooniverse/content'

export default Publications

export async function getStaticProps() {
  try {
    const publicationsData = await createPublicationsResponse()

    // For rendering linked h2's
    publicationsData?.forEach(category => (
      category.slug = category.title.toLowerCase().replaceAll(' ', '-')
    ))

    // For building the sidebar
    const sections = publicationsData?.map(category => ({
      name: category.title,
      slug: category.title.toLowerCase().replaceAll(' ', '-')
    }))

    return {
      props: {
        publicationsData,
        sections,
      },
      revalidate: 60 * 60 * 1 // 1 hour
    }
  } catch (error) {
    throw error
  }
}
