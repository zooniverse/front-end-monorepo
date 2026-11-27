import getDefaultPageProps from '@helpers/getDefaultPageProps'
import projectRedirect from '@helpers/projectRedirect'
export { default } from '@screens/ClassifyPage'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

export async function getStaticProps({ locale, params }) {
  const { notFound, props: defaultProps } = await getDefaultPageProps({ locale, params })
  const redirect = projectRedirect({ params, project: defaultProps.initialState.project })
  if (redirect) return redirect
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
