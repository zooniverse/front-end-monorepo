import getDefaultPageProps from '@helpers/getDefaultPageProps'
import fetchSubjectSets from '@helpers/fetchSubjectSets'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { env } = query
  const { notFound, props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const { workflows } = defaultProps
  const workflow = workflows.find(workflow => workflow.id === params.workflowID)
  const pageTitle = workflow?.displayName || null
  if (workflow?.grouped) {
    workflow.subjectSets = await fetchSubjectSets(workflow, env)
  }

  return ({
    notFound,
    props: {
      ...defaultProps,
      pageTitle,
      workflowID : params.workflowID
    }
  })
}
