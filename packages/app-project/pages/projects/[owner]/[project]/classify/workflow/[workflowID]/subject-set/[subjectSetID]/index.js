import getDefaultPageProps from '@helpers/getDefaultPageProps'

export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { subjectSetID, workflowID } = params
  const { props: defaultProps } = await defaultServerSideProps({ params, query, req, res })
  const props = Object.assign({}, { subjectSetID, workflowID }, defaultProps)
  return ({ props })
}
