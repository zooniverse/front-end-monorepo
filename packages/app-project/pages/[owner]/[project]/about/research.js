import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'

export async function getServerSideProps({ locale, params, query, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ params, query, req, res })

  return {
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['about'])),
      pageTitle: 'Research',
      pageType: 'science_case',
      ...props
    }
  }
}
