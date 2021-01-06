import getDefaultPageProps from '@helpers/getDefaultPageProps'

export async function getServerSideProps({ params, query, req, res }) {
  const { subjectSetID, workflowID } = params
  const { props } = await getDefaultPageProps({ params, query, req, res })
  if (subjectSetID) {
    props.subjectSetID = subjectSetID
  }
  if (workflowID) {
    props.workflowID = workflowID
  }
  return ({ props })
}
