import fetchProjectPage from '@helpers/fetchProjectPage'
import fetchProjectPageTitles from '@helpers/fetchProjectPageTitles'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import fetchTeam from '@helpers/fetchTeam'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'

export async function getServerSideProps({ locale, params, req, res }) {
  const env = 'production'
  const { headers, host } = getServerSideAPIHost(env)
  const { notFound, props } = await getDefaultPageProps({ locale, params, req, res })
  const { project } = props.initialState
  project.about_pages = await fetchProjectPageTitles(project, 'production')
  const page = await fetchProjectPage(project, locale, 'team', 'production')
  const pageTitle = page?.strings?.title ?? 'Team'

  const teamArray = await fetchTeam(project, env)

  return {
    notFound,
    props: {
      ...(await serverSideTranslations(locale, ['components', 'screens'])),
      pageTitle,
      pageType: 'team',
      ...props,
      teamArray
    }
  }
}
