import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'

export async function getServerSideProps({ params, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ params, req, res })
  const { env } = params
  const { project } = props.initialState

  const projectPath = `/${project?.slug}/about/research`
  const destination = env ? `${projectPath}?env=${env}` : projectPath

  return ({
    redirect: {
      destination,
      permanent: true
    }
  })
}
