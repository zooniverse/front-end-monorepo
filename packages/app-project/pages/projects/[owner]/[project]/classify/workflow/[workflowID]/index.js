import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { notFound, props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const props = {
    ...defaultProps,
    workflowID : params.workflowID
  }
  return ({ notFound, props })
}
