import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale, params }) {
  const { notFound, props: defaultProps } = await getDefaultPageProps({ locale, params })
  const { subjectID, workflowID } = params
  const { workflows } = defaultProps
  const workflow = workflows?.find(workflow => workflow.id === params.workflowID)
  const pageTitle = workflow?.displayName || null

  return ({
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      ...defaultProps,
      pageTitle,
      subjectID,
      workflowID
    },
    revalidate: 60
  })
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
