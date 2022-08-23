import { autorun } from 'mobx'
import { addDisposer, flow, getRoot, types } from 'mobx-state-tree'
import auth from 'panoptes-client/lib/auth'
import asyncStates from '@zooniverse/async-states'

export const Collection = types.model('Collection', {
  display_name: types.maybeNull(types.string),
  favorite: false,
  id: types.identifier,
  links: types.frozen({}),
  private: true
})

const Collections = types
  .model('Collections', {
    error: types.maybeNull(types.frozen({})),
    collections: types.array(Collection),
    favourites: types.maybeNull(Collection),
    loadingState: types.optional(
      types.enumeration('state', asyncStates.values),
      asyncStates.initialized
    )
  })

  .actions(self => {
    let client

    const fetchCollections = flow(function * fetchCollections (query) {
      try {
        self.loadingState = asyncStates.loading
        const token = yield auth.checkBearerToken()
        const authorization = `Bearer ${token}`
        const response = yield client.collections.get({ authorization, query })
        const { collections } = response.body
        self.loadingState = asyncStates.success
        return collections
      } catch (error) {
        console.log(error.message)
        self.error = error
        self.loadingState = asyncStates.error
        return []
      }
    })

    const newCollection = flow(function * newCollection (
      options,
      subjectIds = []
    ) {
      try {
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
        const response = yield client.collections.create({
          authorization,
          data,
          project: project.id,
          subjects: subjectIds
        })
        self.loadingState = asyncStates.success
        const [collection] = response.body.collections
        return collection
      } catch (error) {
        console.log(error.message)
        self.error = error
        self.loadingState = asyncStates.error
        return null
      }
    })

    return {
      afterAttach () {
        client = getRoot(self).client
      },

      createCollection: flow(function * createCollection (
        options,
        subjectIds = []
      ) {
        const collection = yield newCollection(options, subjectIds)
        return collection
      }),

      createFavourites: flow(function * createFavourites (subjectIds = []) {
        const { project } = getRoot(self)
        const options = {
          display_name: `Favorites ${project.slug}`,
          favorite: true,
          private: true
        }
        const favourites = yield newCollection(options, subjectIds)
        return favourites
      }),

      searchCollections: flow(function * searchCollections (query) {
        self.collections = yield fetchCollections(query)
      }),

      fetchFavourites: flow(function * fetchFavourites() {
        const { project, user } = getRoot(self)
        const query = {
          favorite: true,
          project_ids: [project.id],
          owner: user.login
        }
        let [favourites] = yield fetchCollections(query)
        return favourites
      }),

      fetchOrCreateFavourites: flow(function * fetchOrCreateFavourites() {
        let favouritesData = yield self.fetchFavourites()
        if (!favouritesData) {
          favouritesData = yield self.createFavourites()
        }
        self.setFavourites(favouritesData)
        return self.favourites
      }),

      setFavourites(favourites) {
        if (favourites) {
          self.favourites = Collection.create(favourites)
        }
      },

      addSubjects: flow(function * addSubjects (id, subjectIds) {
        const token = yield auth.checkBearerToken()
        const authorization = `Bearer ${token}`
        const params = {
          authorization,
          id,
          subjects: subjectIds
        }
        const response = yield client.collections.addSubjects(params)
        const [collection] = response.body.collections
        return collection
      }),

      addFavourites: flow(function * addFavourites (subjectIds) {
        if (!self.favourites?.id) {
          yield self.fetchOrCreateFavourites()
        }
        const favouritesData = yield self.addSubjects(
          self.favourites.id,
          subjectIds
        )
        self.setFavourites(favouritesData)
      }),

      removeSubjects: flow(function * removeSubjects (id, subjectIds) {
        const token = yield auth.checkBearerToken()
        const authorization = `Bearer ${token}`
        const params = {
          authorization,
          id,
          subjects: subjectIds
        }
        yield client.collections.removeSubjects(params)
      }),

      removeFavourites: flow(function * removeFavourites (subjectIds) {
        yield self.removeSubjects(self.favourites.id, subjectIds)
      })
    }
  })

export default Collections
