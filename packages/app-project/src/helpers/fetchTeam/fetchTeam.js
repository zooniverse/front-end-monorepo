import { panoptes } from '@zooniverse/panoptes-js'
import getServerSideAPIHost from '@helpers/getServerSideAPIHost'
import { logToSentry } from '@helpers/logger'

export default async function fetchTeam(project, env) {
  const { headers, host } = getServerSideAPIHost(env)
  let teamArray = []
  try {
    async function getRoles(allRoles = [], page = 1) {
      const teamQuery = {
        env,
        project_id: project.id,
        page
      }
      const response = await panoptes.get(`/project_roles`, teamQuery, { ...headers }, host)
      const { meta, project_roles: projectRoles } = response.body
      if (meta.project_roles?.next_page) {
        return await getRoles(allRoles.concat(projectRoles), meta.project_roles.next_page)
      }
      return allRoles.concat(projectRoles)
    }

    const roles = await getRoles()
    const userIDs = roles.map(role => role.links.owner.id)

    async function getUsers(allUsers = [], page = 1) {
      const userQuery = {
        env,
        id: userIDs.join(','),
        page
      }
      const response = await panoptes.get(`/users`, userQuery, { ...headers }, host)
      const { meta, users = [] } = response.body || {}
      if (meta.users?.next_page) {
        return await getUsers(allUsers.concat(users), meta.users.next_page)
      }
      return allUsers.concat(users)
    }

    const users = await getUsers()
    teamArray = roles.map(role => {
      const user = users.find(u => u.id === role.links.owner.id)
      return { ...user, roles: role.roles }
    })
  } catch (error) {
    console.error('Error loading project roles:', error)
    logToSentry(error)
  }
  return teamArray
}
