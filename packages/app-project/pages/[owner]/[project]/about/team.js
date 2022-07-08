import fetchProjectPage from '@helpers/fetchProjectPage'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import fetchTeam from '@helpers/fetchTeam'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'

export async function getServerSideProps({ locale, params, query, req, res }) {
  const { headers, host } = getServerSideAPIHost(query.env)
  const { notFound, props } = await getDefaultPageProps({ locale, params, query, req, res })
  const { project } = props.initialState
  const page = await fetchProjectPage(project, locale, 'team', query.env)
  const pageTitle = page?.strings?.title ?? 'Team'

  const teamArray = await fetchTeam(project, query.env)

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
