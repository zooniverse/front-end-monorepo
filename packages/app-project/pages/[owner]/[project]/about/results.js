import fetchProjectPage from '@helpers/fetchProjectPage'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale, params, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params, req, res })
  const { project } = props.initialState
  const page = await fetchProjectPage(project, locale, 'results', 'production')
  const pageTitle = page?.strings?.title ?? 'Results'

  return {
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      pageTitle,
      pageType: 'results',
      ...props
    }
  }
}
