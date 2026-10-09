import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

import getProjectCollectPageProps from '@helpers/getProjectCollectPageProps'
export { default } from '@screens/ProjectCollectPage'

export async function getServerSideProps({ locale, params, query }) {
  const { notFound, props } = await getProjectCollectPageProps({
    locale,
    params,
    searchParams: query
  })

  return {
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      ...props
    }
  }
}