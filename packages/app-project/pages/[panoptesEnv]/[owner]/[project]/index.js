import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectHomePage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import fetchProjectPageTitles from '@helpers/fetchProjectPageTitles'

export async function getStaticProps({ locale, params }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params })
  const { project } = props.initialState
  project.about_pages = await fetchProjectPageTitles(project, params.panoptesEnv)

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
