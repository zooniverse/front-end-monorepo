import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'

import numberString from './types/numberString'

const ProjectRoles = types
  .model('ProjectRoles', {
    id: types.maybeNull(numberString),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
  })
  .actions(self => {
    const fetch = flow(function * fetch (projectId) {
      const { client } = getRoot(self)
      self.loadingState = asyncStates.loading
      try {
        let allRoles = []
        const getRoles = async (page = 1) => {
          const query = {
            project_id: projectId,
            page: page
          }
          const response = await client.panoptes.get(`/project_roles`, query)
          const { meta, project_roles: projectRoles } = response.body
          allRoles = allRoles.concat(projectRoles)
          if (meta.project_roles && meta.project_roles.next_page) {
            return getRoles(meta.project_roles.next_page)
          }
        }
        yield getRoles(1)

        let teamArray = []

        yield Promise.all(
          allRoles.map(async role => {
            const response = await client.panoptes.get(`/users`, {
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

        self.loadingState = asyncStates.success
        return teamArray
      } catch (error) {
        console.error('Error loading project roles:', error)
        self.error = error
        self.loadingState = asyncStates.error
      }
    })
    return {
      fetch
    }
  })

export default ProjectRoles
