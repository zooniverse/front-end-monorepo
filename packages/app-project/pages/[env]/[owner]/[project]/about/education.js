import fetchProjectPage from '@helpers/fetchProjectPage'
import fetchProjectPageTitles from '@helpers/fetchProjectPageTitles'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale, params, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params, req, res })
  const { project } = props.initialState
  project.about_pages = await fetchProjectPageTitles(project, 'production')
  const page = await fetchProjectPage(project, locale, 'education', 'production')
  const pageTitle = page?.strings?.title ?? 'Education'

  return {
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      pageTitle,
      pageType: 'education',
      ...props
    }
  }
}
