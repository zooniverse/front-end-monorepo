import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ params, query, req, res }) {
  const { notFound, props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const { subjectID, workflowID } = params
  const { workflows } = defaultProps
  const workflow = workflows.find(workflow => workflow.id === params.workflowID)
  const pageTitle = workflow?.displayName || null

  return ({
    notFound,
    props: {
      ...defaultProps,
      pageTitle,
      subjectID,
      workflowID
    }
  })
}
