import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale, params, query, req, res }) {
  const { notFound, props: defaultProps } = await getDefaultPageProps({ params, query, req, res })
  const { subjectID, workflowID } = params
  const { workflows } = defaultProps
  const workflow = workflows.find(workflow => workflow.id === params.workflowID)
  const pageTitle = workflow?.displayName || null

  return ({
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['screens'])),
      ...defaultProps,
      pageTitle,
      subjectID,
      workflowID
    }
  })
}
