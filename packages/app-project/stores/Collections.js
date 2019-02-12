import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'

export const Collection = types
  .model('Collection', {
    display_name: types.maybeNull(types.string),
    favorite: false,
    id: types.identifier,
    links: types.maybeNull(types.frozen({})),
    private: true
  })

const Collections = types
  .model('Collections', {
    error: types.maybeNull(types.frozen({})),
    favourites: types.maybeNull(Collection),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
  })

  .actions(self => {
    let client
    return {
      afterAttach () {
        client = getRoot(self).client.collections
      },

      createFavourites: flow( function * createFavourites (project) {
        self.loadingState = asyncStates.loading
        const token = yield auth.checkBearerToken()
        const authorization = `Bearer ${token}`
        const data = {
          display_name: `Favourites ${project.slug}`,
          favorite: true
        }
        const projects = [project.id]
        const subjects = []
        const response = yield client.create({ authorization, data, projects, subjects })
        const [ favourites ] = response.body.collections
        self.loadingState = asyncStates.success
        self.favourites = Collection.create(favourites)
      }),

      fetchFavourites: flow( function * fetchFavourites (project, user) {
        self.loadingState = asyncStates.loading
        const token = yield auth.checkBearerToken()
        const authorization = `Bearer ${token}`
        const query = {
          favorite: true,
          project_ids: [project.id],
          owner: user.login
        }
        const response = yield client.get({ authorization, query })
        const [ favourites ] = response.body.collections
        self.loadingState = asyncStates.success
        if (favourites) {
          self.favourites = Collection.create(favourites)
        } else {
          self.createFavourites(project)
        }
      })
    }
  })

export default Collections
  