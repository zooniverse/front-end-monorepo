import PublicationsAPI from '../src/api/publications'
import { logNodeError } from '../src/helpers/logger'
export { default } from '../src/screens/Publications'

export async function getStaticProps() {
  try {
    const publicationsData = await PublicationsAPI.createPublicationsResponse()
    return {
      props: {
        publicationsData
      },
      revalidate: 60 * 60 * 1
    }
  } catch (error) {
    logNodeError(error)
    throw error
  }
}
