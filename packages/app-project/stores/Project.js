import { get } from 'lodash'
import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'

import numberString from './types/numberString'

const Project = types
  .model('Project', {
    avatar: types.frozen({}),
    background: types.frozen({}),
    classifications_count: types.optional(types.number, 0),
    classifiers_count: types.optional(types.number, 0),
    completeness: types.optional(types.number, 0),
    display_name: types.maybeNull(types.string),
    error: types.maybeNull(types.frozen({})),
    id: types.maybeNull(numberString),
    links: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    retired_subjects_count: types.optional(types.number, 0),
    slug: types.optional(types.string, ''),
    urls: types.frozen([]),
    subjects_count: types.optional(types.number, 0)
  })

  .views(self => ({
    get displayName () {
      return self.display_name
    }
  }))

  .actions(self => {
    let client

    return {
      afterAttach () {
        client = getRoot(self).client.projects
      },

      fetch: flow(function * fetch (slug) {
        self.loadingState = asyncStates.loading
        try {
          const query = { slug }
          const response = yield client.getWithLinkedResources({ query })
          const project = response.body.projects[0]
          const linked = response.body.linked

          self.avatar = get(linked, 'avatars[0]', {})
          self.background = get(linked, 'backgrounds[0]', {})

          const properties = [
            'classifications_count',
            'classifiers_count',
            'completeness',
            'configuration',
            'display_name',
            'id',
            'links',
            'retired_subjects_count',
            'slug',
            'subjects_count',
            'urls'
          ]
          properties.forEach(property => { self[property] = project[property] })
          self.loadingState = asyncStates.success
        } catch (error) {
          self.error = error.message
          self.loadingState = asyncStates.error
        }
      })
    }
  })

export default Project
