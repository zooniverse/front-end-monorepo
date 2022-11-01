import getDefaultPageProps from '@helpers/getDefaultPageProps'
import fetchSubjectSets from '@helpers/fetchSubjectSets'
export { default } from '@screens/ClassifyPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale, params }) {
  const { notFound, props: defaultProps } = await getDefaultPageProps({ locale, params })
  const { panoptesEnv, subjectSetID, workflowID } = params
  const { workflows } = defaultProps
  const workflow = workflows?.find(workflow => workflow.id === workflowID)
  let pageTitle = workflow?.displayName || null
  if (workflow?.grouped) {
    workflow.subjectSets = await fetchSubjectSets(workflow, panoptesEnv)
    const subjectSet = workflow.subjectSets?.find(subjectSet => subjectSet.id === subjectSetID)
    pageTitle = `${subjectSet?.display_name} | ${workflow?.displayName}`
  }
  return ({
    notFound,
    props : {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      ...defaultProps,
      pageTitle,
      subjectSetID,
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
