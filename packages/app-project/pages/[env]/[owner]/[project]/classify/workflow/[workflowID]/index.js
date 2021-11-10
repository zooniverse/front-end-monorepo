import getDefaultPageProps from '@helpers/getDefaultPageProps'
import fetchSubjectSets from '@helpers/fetchSubjectSets'
export { default } from '@screens/ClassifyPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale, params }) {
  const { env } = params
  const { notFound, props: defaultProps } = await getDefaultPageProps({ locale, params })
  const { workflows } = defaultProps
  const workflow = workflows?.find(workflow => workflow.id === params.workflowID)
  const pageTitle = workflow?.displayName || null
  if (workflow?.grouped) {
    workflow.subjectSets = await fetchSubjectSets(workflow, env)
  }

  return ({
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      ...defaultProps,
      pageTitle,
      workflowID : params.workflowID
    }
  })
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
