import { autorun } from 'mobx'
import { addDisposer, getRoot, types, flow } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import ResourceStore from './ResourceStore'
import UserProjectPreferences from './UserProjectPreferences'
import { getBearerToken } from './utils'
import merge from 'lodash/merge'

const UserProjectPreferencesStore = types
  .model('UserProjectPreferencesStore', {
    active: types.maybe(types.reference(UserProjectPreferences)),
    headers: types.maybe(types.frozen({
      etag: types.string
    })),
    resources: types.optional(types.map(UserProjectPreferences), {}),
    type: types.optional(types.string, 'project_preferences')
  })

  .actions(self => {
    function afterAttach () {
      createProjectObserver()
    }

    function createProjectObserver () {
      const projectDisposer = autorun(() => {
        const project = getRoot(self).projects.active

        if (project) {
          self.reset()
          self.checkForUser()
        }
      })
      addDisposer(self, projectDisposer)
    }

    function * createUPP (authorization) {
      const { type } = self
      const client = getRoot(self).client.panoptes
      const project = getRoot(self).projects.active
      const data = {
        links: { project: project.id },
        preferences: {}
      }
      self.loadingState = asyncStates.posting
      try {
        const response = yield client.post(`/${type}`, { [type]: data }, { authorization })
        self.headers = response.headers
        return response.body[type][0]
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function * checkForUser () {
      const { authClient } = getRoot(self)

      try {
        const authorization = yield getBearerToken(authClient)
        const user = yield authClient.checkCurrent()

        if (authorization && user) {
          self.fetchUPP(authorization, user)
        } else {
          self.reset()
          self.loadingState = asyncStates.success
        }
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function * fetchUPP (authorization, user) {
      let resource
      const { type } = self
      const client = getRoot(self).client.panoptes
      const project = getRoot(self).projects.active

      self.loadingState = asyncStates.loading
      try {
        const response = yield client.get(`/${type}`, { project_id: project.id, user_id: user.id }, { authorization })
        if (response.body[type][0]) {
          self.headers = response.headers
          resource = response.body[type][0]
        } else {
          resource = yield self.createUPP(authorization)
        }

        self.loadingState = asyncStates.success
        if (resource) self.setUPP(resource)
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function * updateUPP (changes) {
      const { authClient } = getRoot(self)
      const upp = self.resources.get(self.active.id)
      if (upp) {
        const authorization = yield getBearerToken(authClient)
        const { type } = self
        const client = getRoot(self).client.panoptes
        self.loadingState = asyncStates.putting
        try {
          const newUPP = merge({}, upp, changes)
          const headers = {
            authorization,
            etag: self.headers.etag
          }
          if (self.headers['Last-Modified']) headers.lastModified = self.headers['Last-Modified']
          const response = yield client.put(`/${type}/${upp.id}`, { [type]: { preferences: newUPP.preferences } }, headers)
          const updatedUPP = response.body[type][0]
          self.setUPP(updatedUPP)
          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
          self.loadingState = asyncStates.error
        }
      }
    }

    function setUPP (userProjectPreferences) {
      self.setResource(userProjectPreferences)
      self.setActive(userProjectPreferences.id)
    }

    return {
      afterAttach,
      checkForUser: flow(checkForUser),
      createUPP: flow(createUPP),
      fetchUPP: flow(fetchUPP),
      setUPP,
      updateUPP: flow(updateUPP)
    }
  })

export default types.compose('UserProjectPreferencesResourceStore', ResourceStore, UserProjectPreferencesStore)
