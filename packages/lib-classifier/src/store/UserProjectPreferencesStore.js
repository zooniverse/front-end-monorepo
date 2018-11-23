import { autorun } from 'mobx'
import { addDisposer, getRoot, types, flow } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import ResourceStore from './ResourceStore'
import UserProjectPreferences from './UserProjectPreferences'

const UserProjectPreferencesStore = types
  .model('UserProjectPreferencesStore', {
    active: types.maybe(types.reference(UserProjectPreferences)),
    resources: types.optional(types.map(UserProjectPreferences), {}),
    type: types.optional(types.string, 'project_preferences')
  })

  .actions(self => {
    function afterAttach() {
      createProjectObserver()
    }

    function createProjectObserver() {
      const projectDisposer = autorun(() => {
        const project = getRoot(self).projects.active
        if (project) {
          self.reset()
          self.createTempUPPOrFetchUPP()
        }
      })
      addDisposer(self, projectDisposer)
    }

    function createTempUPPOrFetchUPP () {
      const project = getRoot(self).projects.active
      const { authClient } = getRoot(self)

      if (!authClient || !authClient.getToken) {
        self.createTempUPP()
        return null
      }

      const authToken = authClient.getToken() || {}
      console.log('authToken', authToken)
      const user = authClient.getUser()
      if (authToken.token && user) {
        self.fetchUPP(project, user)
      } else {
        self.createTempUPP()
      }
    }

    function createTempUPP() {
      const tempUPP = UserProjectPreferences.create({ id: 'guestPreferencesDoNotPost', preferences: {} })
      self.loadingState = asyncStates.success
      self.setUPP(tempUPP)
    }

    function * fetchUPP (project, user) {
      let resource
      const { type } = self
      const client = getRoot(self).client.panoptes
      const bearerToken = `Bearer ${token}`
      self.loadingState = asyncStates.loading
      try {
        const response = yield client.get(`/${type}`, { project_id: project.id, user_id: user.id }, bearerToken)
        resource = response.body[type][0] || self.createUPP(bearerToken)
        self.loadingState = asyncStates.success
        self.setUPP(resource)
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function * createUPP (bearerToken) {
      const { type } = self
      const project = getRoot(self).projects.active
      const data = {
        links: { project: project.id },
        preferences: {}
      }
      self.loadingState = asyncStates.posting
      try {
        const response = yield client.post(`/${type}`, { [type]: data }, bearerToken)
        return response.body[type][0]
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function setUPP (userProjectPreferences) {
      self.setResource(userProjectPreferences)
      self.setActive(userProjectPreferences.id)
    }

    return {
      afterAttach,
      createTempUPPOrFetchUPP,
      createTempUPP,
      fetchUPP: flow(fetchUPP),
      setUPP
    }
  })

export default types.compose('UserProjectPreferencesResourceStore', ResourceStore, UserProjectPreferencesStore)
