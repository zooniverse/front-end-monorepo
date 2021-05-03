import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { notFound, props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const { subjectID, subjectSetID, workflowID } = params
  const props = { ...defaultProps, subjectID, subjectSetID, workflowID }
  return ({ notFound, props })
}
