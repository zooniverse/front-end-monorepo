export { default } from '@screens/ClassifyPage'

export function getServerSideProps({ params, req, resp }) {
  const { subjectSetID, workflowID } = params
  const props = { subjectSetID, workflowID }
  return ({ props })
}