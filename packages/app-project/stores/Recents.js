import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import asyncStates from '@zooniverse/async-states'

export const Recent = types
  .model('Recent', {
    subjectId: types.string,
    locations: types.frozen({})
  })

const Recents = types
  .model('Recents', {
    error: types.maybeNull(types.frozen({})),
    recents: types.array(Recent),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized)
  })

  .actions(self => {
    function createProjectObserver () {
      const projectDisposer = autorun(() => {
        const { project, user } = getRoot(self)
        if (project.id && user.id) {
          self.fetch()
        }
      })
      addDisposer(self, projectDisposer)
    }

    return {
      afterAttach () {
        createProjectObserver()
      },

      fetch: flow(function * fetch () {
        const { client, project, user } = getRoot(self)
        self.loadingState = asyncStates.loading
        try {
          const token = yield auth.checkBearerToken()
          const authorization = `Bearer ${token}`
          const query = {
            project_id: project.id,
            sort: '-created_at'
          }
          const response = yield client.panoptes.get(`/users/${user.id}/recents`, query, authorization)
          const { recents } = response.body
          self.recents = recents.map(recent => ({
            subjectId: recent.links.subject,
            locations: recent.locations
          }))
          self.loadingState = asyncStates.success
          self.recents.map(recent => console.log(recent.subjectId, recent.locations))
        } catch (error) {
          console.error(error)
          self.error = error
          self.loadingState = asyncStates.error
        }
      }),

      add ({ subjectId, locations }) {
        self.recents.unshift(Recent.create({ subjectId, locations }))
      }
    }
  })

export default Recents
