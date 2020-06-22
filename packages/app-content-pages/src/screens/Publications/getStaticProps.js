import PublicationsAPI  from '../../api/publications'

export default async function getStaticProps() {
  let error = null
  let publicationsData = []
  try {
    publicationsData = await PublicationsAPI.createPublicationsResponse()
  } catch (err) {
    error = err.message
  }
  return {
    props: {
      error,
      publicationsData
    },
    unstable_revalidate: 60 * 60 * 1
  }
}
