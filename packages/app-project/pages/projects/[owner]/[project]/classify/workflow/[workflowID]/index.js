export { default } from '@screens/ClassifyPage'

export function getServerSideProps({ params, req, resp }) {
  const { workflowID } = params
  const props = { workflowID }
  return ({ props })
}
