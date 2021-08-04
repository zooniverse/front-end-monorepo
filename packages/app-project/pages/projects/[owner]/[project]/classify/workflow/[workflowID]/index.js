import getDefaultPageProps from '@helpers/getDefaultPageProps'
import fetchSubjectSets from '@helpers/fetchSubjectSets'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { env } = query
  const { notFound, props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const { workflows } = defaultProps
  const [ workflow ] = workflows.filter(workflow => workflow.id === params.workflowID)
  if (workflow?.grouped) {
    workflow.subjectSets = await fetchSubjectSets(workflow, env)
  }
  const props = {
    ...defaultProps,
    workflowID : params.workflowID
  }
  return ({ notFound, props })
}
