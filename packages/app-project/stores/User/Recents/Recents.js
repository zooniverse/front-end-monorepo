import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import asyncStates from '@zooniverse/async-states'

export const Recent = types
  .model('Recent', {
    favorite: types.optional(types.boolean, false),
    subjectId: types.string,
    locations: types.frozen({})
  })
  .actions(self => {
    function toggleFavourite () {
      const { collections } = getRoot(self)
      self.favorite = !self.favorite
      if (self.favorite) {
        collections.addFavourites([self.subjectId])
      } else {
        collections.removeFavourites([self.subjectId])
      }
    }
    return {
      toggleFavourite
    }
  })

const Recents = types
  .model('Recents', {
    error: types.maybeNull(types.frozen({})),
    recents: types.array(Recent),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized)
  })

  .actions(self => {
    return {
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
          const response = yield client.panoptes.get(`/users/${user.id}/recents`, query, { authorization })
          const { recents } = response.body
          self.recents = recents.map(recent => ({
            subjectId: recent.links.subject,
            locations: recent.locations
          }))
          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
          self.error = error
          self.loadingState = asyncStates.error
        }
      }),

      add ({ subjectId, favorite = false, locations }) {
        self.recents.unshift(Recent.create({ subjectId, favorite, locations }))
      }
    }
  })

export default Recents
