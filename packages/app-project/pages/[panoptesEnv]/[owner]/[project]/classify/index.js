import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getDefaultPageProps from '@helpers/getDefaultPageProps'

export { default } from '@screens/ClassifyPage'

// the default API is staging for local development, production otherwise.
const defaultEnv = process.env.APP_ENV === 'development' ? 'staging' : 'production'

export async function getStaticProps({ defaultLocale, locale, params }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params })

  if (props.workflowID) {
    const { project } = props.initialState
    const requestPath = `/${project.slug}/classify`
    const { panoptesEnv } = params
    const pathname = locale === defaultLocale ? requestPath : `/${locale}${requestPath}`
    const search = panoptesEnv === defaultEnv ? '' : `?env=${panoptesEnv}`

    return ({
      redirect: {
        destination: `${pathname}/workflow/${props.workflowID}${search}`,
        permanent: true
      }
    })
  }
  return ({
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      pageTitle: 'Classify',
      ...props
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
