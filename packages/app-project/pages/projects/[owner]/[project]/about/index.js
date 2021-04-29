import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { props } = await getDefaultPageProps({ params, query, req, res })
  const { env } = query
  const { project } = props.initialState

  const projectPath = `/projects/${project?.slug}/about/research`
  const redirect = env ? `${projectPath}?env=${env}` : projectPath

  res.statusCode = 301
  res.setHeader('Location', redirect)
  res.end()

  return ({ props })
}
