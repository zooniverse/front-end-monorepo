import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'

import getProjectRecentsPageProps from '@helpers/getProjectRecentsPageProps'
export { default } from '@screens/ProjectRecentsPage'

// getServerSideProps: We want to show the latest data on every recents page request
export async function getServerSideProps({ locale, params }) {
  // notFound will only equal true here if notFoundError() is triggered in getProjectRecentsPageProps()
  const { notFound, props } = await getProjectRecentsPageProps({ locale, params })

  return ({
    notFound, // when notFound = true, this page returns a 404
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      ...props
    },
  })
}
