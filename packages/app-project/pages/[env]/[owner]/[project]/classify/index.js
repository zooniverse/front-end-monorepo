import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ClassifyPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale, params }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params })
  if (props.workflowID) {
    const { env } = params
    const { project } = props.initialState
    const { workflows } = props
    const workflow = workflows?.find(workflow => workflow.id === params.workflowID)
    const workflowPath = `/${project?.slug}/classify/workflow/${props.workflowID}`
    const destination = env ? `${workflowPath}?env=${env}` : workflowPath
    return ({
      redirect: {
        destination,
        permanent: true
      }
    })
  }
  return ({
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      pageTitle: 'Classify',
      ...props,
      revalidate: 60
    }
  })
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
