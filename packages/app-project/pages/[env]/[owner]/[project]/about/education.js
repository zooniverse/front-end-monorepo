import fetchProjectPage from '@helpers/fetchProjectPage'
import fetchProjectPageTitles from '@helpers/fetchProjectPageTitles'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getStaticProps({ locale, params }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params })
  const { project } = props.initialState
  project.about_pages = await fetchProjectPageTitles(project, params.env)
  const page = await fetchProjectPage(project, locale, 'education', params.env)
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

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
