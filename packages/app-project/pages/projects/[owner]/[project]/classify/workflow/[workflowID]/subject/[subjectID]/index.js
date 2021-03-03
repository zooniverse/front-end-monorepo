import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const { subjectID, workflowID } = params
  const props = { ...defaultProps, subjectID, workflowID }
  return ({ props })
}
