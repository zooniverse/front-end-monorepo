import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const { subjectSetID, workflowID } = params
  const props = { ...defaultProps, subjectSetID, workflowID }
  return ({ props })
}
