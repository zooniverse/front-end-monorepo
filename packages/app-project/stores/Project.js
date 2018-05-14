import { flow, types } from 'mobx-state-tree'
import _ from 'lodash'
import axios from 'axios'

function transformResponse (response) {
  return _.get(response, 'data.projects[0]')
}

function fetchProjectData (slug) {
  console.info('Fetching project', slug)
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
    isLoading: types.boolean,
    data: types.optional(types.frozen, {})
  })
  .actions(self => ({
    fetch: flow(function * fetch (slug) {
      try {
        self.isLoading = true
        self.data = yield fetchProjectData(slug)
      } catch (error) {
        console.error('Failed to fetch project', error)
      }
      self.isLoading = false
    })
  }))

const defaultProjectState = {
  isLoading: false
}

export {
  Project as default,
  defaultProjectState
}
