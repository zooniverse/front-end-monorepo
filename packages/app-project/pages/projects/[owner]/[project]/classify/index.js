import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ params, query, req, res })
  if (props.workflowID) {
    const { env } = query
    const { project } = props.initialState
    const { workflows } = props
    const workflow = workflows.find(workflow => workflow.id === params.workflowID)
    const workflowPath = `/projects/${project?.slug}/classify/workflow/${props.workflowID}`
    const destination = env ? `${workflowPath}?env=${env}` : workflowPath
    return ({
      redirect: {
        destination,
        permanent: true
      }
    })
  }
  return ({
    notFound,
    props: {
      pageTitle: 'Classify',
      ...props
    }
  })
}
