export { default } from '@screens/ClassifyPage'

export function getServerSideProps({ params, req, res }) {
  const { workflowID } = params
  const props = { workflowID }
  return ({ props })
}
