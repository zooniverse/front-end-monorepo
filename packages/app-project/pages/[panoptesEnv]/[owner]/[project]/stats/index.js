import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import getProjectStatsPageProps from '@helpers/getProjectStatsPageProps'
export { default } from '@screens/ProjectStatsPage'

// getServerSideProps: We want to show the latest data on every stats page request
export async function getServerSideProps({ locale, params }) {
  // notFound will only equal true here if notFoundError() is triggered in getProjectStatsPageProps()
  const { notFound, props } = await getProjectStatsPageProps({ locale, params })

  return ({
    notFound, // when notFound = true, this page returns a 404
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      ...props
    },
  })
}
