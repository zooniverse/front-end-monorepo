import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'

export async function getServerSideProps({ params, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ params, req, res })
  const { panoptesEnv } = params
  const { project } = props.initialState

  const projectPath = `/${project?.slug}/about/research`
  const destination = panoptesEnv ? `${projectPath}?env=${panoptesEnv}` : projectPath

  return ({
    redirect: {
      destination,
      permanent: true
    }
  })
}
