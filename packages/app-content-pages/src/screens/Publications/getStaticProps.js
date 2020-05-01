import createPublicationsResponse  from '../../api/publications'
import cache from '../../api/publications/publicationsCache'

export default async function getStaticProps() {
  let error = null
  let publicationsData = []
  try {
    publicationsData = await cache.get('publications', createPublicationsResponse)
  } catch (err) {
    error = err.message
  }
  return {
    props: {
      error,
      publicationsData
    }
  }
}
