import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ params, query, req, res })
  const { env } = query
  const { project } = props.initialState

  const projectPath = `/projects/${project?.slug}/about/research`
  const destination = env ? `${projectPath}?env=${env}` : projectPath

  return ({
    redirect: {
      destination,
      permanent: true
    }
  })
}
