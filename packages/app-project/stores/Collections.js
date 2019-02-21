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
    collections: types.optional(types.array(Collection), []),
    favourites: types.maybeNull(Collection),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized)
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

      createCollection: flow(function * createCollection (options, subjectIds=[]) {
        const { project } = getRoot(self)
        self.loadingState = asyncStates.loading
        const token = yield auth.checkBearerToken()
        const authorization = `Bearer ${token}`
        const defaults = {
          display_name: '',
          favorite: false,
          private: false
        }
        const data = Object.assign({}, defaults, options)
        const response = yield client.create({ authorization, data, project: project.id, subjects: subjectIds })
        const [ collection ] = response.body.collections
        self.loadingState = asyncStates.success
        if (options.favorite) {
          self.favourites = Collection.create(collection)
        } else {
          self.collections.push(collection)
        }
      }),

      createFavourites: flow(function * createFavourites (subjectIds=[]) {
        const { project } = getRoot(self)
        const options = {
          display_name: `Favorites ${project.slug}`,
          favorite: true,
          private: true
        }
        return self.createCollection(options, subjectIds)
      }),

      fetchCollections: flow(function * fetchCollections (query) {
        const { project, user } = getRoot(self)
        self.loadingState = asyncStates.loading
        const token = yield auth.checkBearerToken()
        const authorization = `Bearer ${token}`
        const response = yield client.get({ authorization, query })
        const { collections } = response.body
        self.loadingState = asyncStates.success
        self.collections = collections
      }),

      fetchFavourites: flow(function * fetchFavourites () {
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

      addFavourites: flow(function * addFavourites (subjectIds) {
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

      removeFavourites: flow(function * removeFavourites (subjectIds) {
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
