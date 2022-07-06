import fetchProjectPage from '@helpers/fetchProjectPage'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
import { panoptes } from '@zooniverse/panoptes-js'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import { logToSentry } from '@helpers/logger'

export async function getServerSideProps({ locale, params, query, req, res }) {
  const { headers, host } = getServerSideAPIHost(query.env)
  const { notFound, props } = await getDefaultPageProps({ locale, params, query, req, res })
  const { project } = props.initialState
  const page = await fetchProjectPage(project, locale, 'team', query.env)
  const pageTitle = page?.strings?.title ?? 'Team'

  async function fetchTeam() {
    let teamArray = []
    try {
      let allRoles = []
      const getRoles = async (page = 1) => {
        const teamQuery = {
          env: query.env,
          project_id: project.id,
          page: page
        }
        const response = await panoptes.get(`/project_roles`, teamQuery, { ...headers }, host)
        const { meta, project_roles: projectRoles } = response.body
        allRoles = allRoles.concat(projectRoles)
        if (meta.project_roles && meta.project_roles.next_page) {
          return getRoles(meta.project_roles.next_page)
        }
      }
      await getRoles(1)

      const userIDs = allRoles.map(role => role.links.owner.id)
      const response = await panoptes.get(`/users`, {
        env: query.env,
        id: userIDs.join(',')
      })
      const users = response?.body?.users || []
      teamArray = allRoles.map(role => {
        const user = users.find(u => u.id === role.links.owner.id)
        return { ...user, roles: role.roles }
      })
    } catch (error) {
      console.error('Error loading project roles:', error)
      logToSentry(error)
    }
    return teamArray
  }

  const teamArray = await fetchTeam()

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
