import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale, params, query, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ params, query, req, res })

  return {
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['screens'])),
      pageTitle: 'Education',
      pageType: 'education',
      ...props
    }
  }
}
