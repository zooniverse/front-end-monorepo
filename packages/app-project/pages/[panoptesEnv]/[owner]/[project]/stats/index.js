import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

import getProjectStatsPageProps from '@helpers/getProjectStatsPageProps'
export { default } from '@screens/ProjectStatsPage'

export async function getStaticProps({ locale, params }) {
  const { notFound, props } = await getProjectStatsPageProps({ locale, params })

  return ({
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
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
