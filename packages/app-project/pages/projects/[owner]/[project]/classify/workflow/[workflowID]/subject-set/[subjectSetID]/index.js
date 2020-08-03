export { default } from '@screens/ClassifyPage'

export function getServerSideProps({ params, req, res }) {
  const { subjectSetID, workflowID } = params
  const props = { subjectSetID, workflowID }
  return ({ props })
}
