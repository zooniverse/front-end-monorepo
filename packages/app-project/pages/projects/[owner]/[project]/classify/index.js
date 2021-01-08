import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { props } = await getDefaultPageProps({ params, query, req, res })
  const { env } = query
  if (props.workflowID) {
    const redirect = env ? `workflow/${props.workflowID}?env=${env}` : `workflow/${props.workflowID}`
    res.statusCode = 301
    res.setHeader('Location', redirect)
    res.end()
  }
  return ({ props })
}
