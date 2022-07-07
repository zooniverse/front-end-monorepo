import fetchProjectPage from '@helpers/fetchProjectPage'
import fetchProjectPages from '@helpers/fetchProjectPages'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale, params, query, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params, query, req, res })
  const { project } = props.initialState
  project.about_pages = await fetchProjectPages(project, query.env)
  const page = await fetchProjectPage(project, locale, 'education', query.env)
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
