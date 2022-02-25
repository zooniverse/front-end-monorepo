import merge from 'lodash/merge'
import { autorun } from 'mobx'
import { addDisposer, getRoot, isValidReference, tryReference, types, flow } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'

import ResourceStore from '@store/ResourceStore'
import UserProjectPreferences from './UserProjectPreferences'
import { getBearerToken } from '@store/utils'

const UserProjectPreferencesStore = types
  .model('UserProjectPreferencesStore', {
    active: types.safeReference(UserProjectPreferences),
    resources: types.map(UserProjectPreferences),
    type: types.optional(types.string, 'project_preferences')
  })

  // TODO: move some of these req into panoptes.js helpers
  .actions(self => {
    function afterAttach () {
      createProjectObserver()
    }

    function createProjectObserver () {
      const projectDisposer = autorun(() => {
        const validProjectReference = isValidReference(() => getRoot(self).projects.active)

        if (validProjectReference) {
          self.reset()
          self.checkForUser()
        }
      }, { name: 'UPPStore Project Observer autorun' })
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
        return null
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
          // We don't store the headers from this get response because it's by query params
          // and not for a specific resource, so the etag won't be usable for the later PUT request
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

    function * fetchUPPById (id = '') {
      const { type } = self
      const uppId = id || self.active.id
      const client = getRoot(self).client.panoptes
      const { authClient } = getRoot(self)
      const authorization = yield getBearerToken(authClient)
      const headers = {
        authorization
      }
      try {
        const response = yield client.get(`/${type}/${uppId}`, null, headers)
        const resource = response.body[type][0]
        if (resource) {
          self.headers = response.headers
          self.setUPP(resource)
          return resource
        }
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
        return null
      }
      return null
    }

    function * updateUPP (changes) {
      const upp = tryReference(() => self.active)
      if (upp) {
        self.loadingState = asyncStates.putting
        try {
          if (self.headers.etag) {
            const mergedUPP = merge({}, upp, changes)
            yield self.putUPP(mergedUPP)
          } else {
            // We re-request for the upp to get a usable etag header
            const currentUPP = yield self.fetchUPPById(upp.id)
            const mergedUPP = merge({}, currentUPP, changes)
            yield self.putUPP(mergedUPP)
          }
        } catch (error) {
          console.error(error)
          self.loadingState = asyncStates.error
        }
      }
    }

    function * putUPP (upp) {
      const { type } = self
      const client = getRoot(self).client.panoptes
      const { authClient } = getRoot(self)
      const authorization = yield getBearerToken(authClient)

      if (upp && self.headers.etag) {
        const headers = {
          authorization,
          etag: self.headers.etag
        }
        const { id, preferences } = upp
        try {
          const response = yield client.put(`/${type}/${id}`, { [type]: { preferences } }, headers)
          if (response.body[type][0]) {
            self.headers = response.headers
            const updatedUPP = response.body[type][0]
            self.setUPP(updatedUPP)
          }

          self.loadingState = asyncStates.success
        } catch (error) {
          console.error(error)
          self.loadingState = asyncStates.error
        }
      }
    }

    function setUPP (userProjectPreferences) {
      self.setResources([userProjectPreferences])
      self.setActive(userProjectPreferences.id)
    }

    return {
      afterAttach,
      checkForUser: flow(checkForUser),
      createUPP: flow(createUPP),
      fetchUPP: flow(fetchUPP),
      fetchUPPById: flow(fetchUPPById),
      putUPP: flow(putUPP),
      setUPP,
      updateUPP: flow(updateUPP)
    }
  })

export default types.compose('UserProjectPreferencesResourceStore', ResourceStore, UserProjectPreferencesStore)
