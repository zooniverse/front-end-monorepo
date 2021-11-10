import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getDefaultPageProps from '@helpers/getDefaultPageProps'

export { default } from '@screens/ClassifyPage'

export async function getServerSideProps({ defaultLocale, locale, params, req, res, resolvedUrl }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params, req, res })
  if (props.workflowID) {
    const [requestPath, requestQuery] = resolvedUrl.split('?')
    const pathname = locale === defaultLocale ? requestPath : `/${locale}${requestPath}`
    const search = requestQuery ? `?${requestQuery}` : ''

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
    }
  })
}
