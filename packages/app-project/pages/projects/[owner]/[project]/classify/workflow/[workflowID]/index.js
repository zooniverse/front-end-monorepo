import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  /*
    Redirect to the active workflow when a project has a single workflow
  */
  if (defaultProps.workflowID && (params.workflowID !== defaultProps.workflowID)) {
    const { env } = query
    const { project } = defaultProps.initialState
    const redirect = env ?
      `/projects/${project?.slug}/classify/workflow/${defaultProps.workflowID}?env=${env}` :
      `/projects/${project?.slug}/classify/workflow/${defaultProps.workflowID}`
    res.statusCode = 301
    res.setHeader('Location', redirect)
    res.end()
  }
  const props = {
    ...defaultProps,
    workflowID : params.workflowID
  }
  return ({ props })
}
