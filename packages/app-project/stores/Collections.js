import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import asyncStates from '@zooniverse/async-states'

export const Collection = types
  .model('Collection', {
    display_name: types.maybeNull(types.string),
    favorite: false,
    id: types.identifier,
    links: types.frozen({}),
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

    function createProjectObserver () {
      const projectDisposer = autorun(() => {
        const project = getRoot(self).project
        const user = getRoot(self).user
        if (project.id && user.id) {
          self.fetchFavourites()
        }
      })
      addDisposer(self, projectDisposer)
    }

    return {
      afterAttach () {
        client = getRoot(self).client.collections
        createProjectObserver()
      },

      createFavourites: flow( function * createFavourites () {
        const { project } = getRoot(self)
        self.loadingState = asyncStates.loading
        const token = yield auth.checkBearerToken()
        const authorization = `Bearer ${token}`
        const data = {
          display_name: `Favorites ${project.slug}`,
          favorite: true
        }
        const subjects = []
        const response = yield client.create({ authorization, data, project : project.id, subjects })
        const [ favourites ] = response.body.collections
        self.loadingState = asyncStates.success
        self.favourites = Collection.create(favourites)
      }),

      fetchFavourites: flow( function * fetchFavourites () {
        const { project, user } = getRoot(self)
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
          self.createFavourites()
        }
      }),
      
      addFavourites: flow( function * addFavourites (subjectIds) {
        const token = yield auth.checkBearerToken()
        const authorization = `Bearer ${token}`
        const params = {
          authorization,
          collectionId: self.favourites.id,
          subjects: subjectIds
        }
        const response = yield client.addSubjects(params)
        const [ favourites ] = response.body.collections
        self.favourites = Collection.create(favourites)
      }),

      removeFavourites: flow( function * removeFavourites (subjectIds) {
        const token = yield auth.checkBearerToken()
        const authorization = `Bearer ${token}`
        const params = {
          authorization,
          collectionId: self.favourites.id,
          subjects: subjectIds
        }
        const response = yield client.removeSubjects(params)
        const [ favourites ] = response.body.collections
        self.favourites = Collection.create(favourites)
      })
    }
  })

export default Collections
  