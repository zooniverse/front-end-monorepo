import fetchProjectPage from '@helpers/fetchProjectPage'
import getDefaultPageProps from '@helpers/getDefaultPageProps'
import { panoptes } from '@zooniverse/panoptes-js'
export { default } from '@screens/ProjectAboutPage'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export async function getServerSideProps({ locale, params, query, req, res }) {
  const { notFound, props } = await getDefaultPageProps({ locale, params, query, req, res })
  const { project } = props.initialState
  const page = await fetchProjectPage(project, locale, 'team', query.env)
  const pageTitle = page?.strings?.title ?? 'Team'

  const fetchTeam = async () => {
    try {
      let allRoles = []
      const getRoles = async (page = 1) => {
        const teamQuery = {
          env: query.env,
          project_id: project.id,
          page: page
        }
        const response = await panoptes.get(`/project_roles`, teamQuery)
        const { meta, project_roles: projectRoles } = response.body
        allRoles = allRoles.concat(projectRoles)
        if (meta.project_roles && meta.project_roles.next_page) {
          return getRoles(meta.project_roles.next_page)
        }
      }
      await getRoles(1)

      let teamArray = []

      await Promise.all(
        allRoles.map(async role => {
          const response = await panoptes.get(`/users`, {
            env: query.env,
            id: role.links.owner.id
          })
          const userData = response.body.users[0]
          return {
            ...userData,
            roles: role.roles
          }
        })
      )
        .then(users => (teamArray = users))
        .catch(error => console.error('Error retrieving team users', error))

      return teamArray
    } catch (error) {
      console.error('Error loading project roles:', error)
    }
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
