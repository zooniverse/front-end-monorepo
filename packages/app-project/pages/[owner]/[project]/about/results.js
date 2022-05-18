import fetchTranslations from '@helpers/fetchTranslations'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale, params, query, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params, query, req, res })
  const page = props.initialState.project.about_pages.find(page => page.url_key === 'results')
  const translations = await fetchTranslations({
    translated_id: page?.id,
    translated_type: 'project_page',
    language: locale,
    env: query.env
  })
  if (translations?.strings) {
    page.strings = translations.strings
  }
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
