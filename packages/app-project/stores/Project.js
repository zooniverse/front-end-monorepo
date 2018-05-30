import { flow, types } from 'mobx-state-tree'
import _ from 'lodash'
import axios from 'axios'
import asyncStates from './asyncStates'

function transformResponse (response) {
  return _.get(response, 'data.projects[0]')
}

function fetchProjectData (slug) {
  return axios({
    url: 'https://www.zooniverse.org/api/projects',
    params: { slug },
    headers: {
      'Accept': 'application/vnd.api+json; version=1',
      'Content-Type': 'application/json'
    }
  }).then(transformResponse)
}

const Project = types
  .model('Project', {
    data: types.optional(types.frozen, {})
  })
  .volatile(self => ({
    state: types.enumeration('state', asyncStates)
  }))
  .actions(self => ({
    afterCreate () {
      self.state = 'initialised'
    },
    fetch: flow(function * fetch (slug) {
      self.state = 'loading'
      try {
        self.data = yield fetchProjectData(slug)
        self.state = 'success'
      } catch (error) {
        console.error('Failed to fetch project', error)
        self.state = 'error'
      }
    })
  }))

export default Project
