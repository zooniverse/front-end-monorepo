import fetchProjectPage from '@helpers/fetchProjectPage'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import fetchTeam from '@helpers/fetchTeam'

export async function getStaticProps({ locale, params }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params })
  const { panoptesEnv } = params
  const { project } = props.initialState
  const page = await fetchProjectPage(project, locale, 'team', panoptesEnv)
  const pageTitle = page?.strings?.title ?? 'Team'

  const teamArray = await fetchTeam(project, panoptesEnv)

  return {
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      pageTitle,
      pageType: 'team',
      ...props,
      teamArray: teamArray
    },
    revalidate: 60
  }
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: 'blocking'
  }
}
