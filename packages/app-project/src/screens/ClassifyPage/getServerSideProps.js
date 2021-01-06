import getDefaultPageProps from '@helpers/getDefaultPageProps'

export async function getServerSideProps({ params, query, req, res }) {
  let { subjectSetID, workflowID } = params
  const { props } = await getDefaultPageProps({ params, query, req, res })
  const { project } = props.initialState
  const activeWorkflows = project.links['active_workflows']
  if (activeWorkflows.length === 1) {
    [workflowID] = project.links['active_workflows']
  }
  if (subjectSetID) {
    props.subjectSetID = subjectSetID
  }
  if (workflowID) {
    props.workflowID = workflowID
  }
  return ({ props })
}
