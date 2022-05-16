import fetchTranslations from '@helpers/fetchTranslations'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale, params, query, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params, query, req, res })
  const page = props.initialState.project.about_pages.find(page => page.url_key === 'education')
  const { strings } = await fetchTranslations({
    translated_id: page.id,
    translated_type: 'project_page',
    language: locale,
    env: query.env
  })
  page.strings = strings

  return {
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      pageTitle: strings.title,
      pageType: 'education',
      ...props
    }
  }
}
