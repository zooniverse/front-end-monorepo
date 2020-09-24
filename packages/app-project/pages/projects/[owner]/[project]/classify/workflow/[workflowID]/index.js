import getDefaultPageProps from '@helpers/getDefaultPageProps'

export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { workflowID } = params
  const { props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const props = Object.assign({}, { workflowID }, defaultProps)
  return ({ props })
}
