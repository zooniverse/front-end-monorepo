import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { props } = await getDefaultPageProps({ params, query, req, res })
  if (props.workflowID) {
    const { env } = query
    const { project } = props.initialState
    const workflowPath = `/projects/${project?.slug}/classify/workflow/${props.workflowID}`
    const redirect = env ? `${workflowPath}?env=${env}` : workflowPath
    res.statusCode = 301
    res.setHeader('Location', redirect)
    res.end()
  }
  return ({ props })
}
