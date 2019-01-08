import asyncStates from '@zooniverse/async-states'
import { flow, getRoot, types } from 'mobx-state-tree'

import numberString from './types/numberString'

const Project = types
  .model('Project', {
    background: types.frozen({}),
    classificationsCount: types.optional(types.number, 0),
    classifiersCount: types.optional(types.number, 0),
    completeness: types.optional(types.number, 0),
    displayName: types.maybeNull(types.string),
    error: types.maybeNull(types.frozen({})),
    id: types.maybeNull(numberString),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    retiredSubjectsCount: types.optional(types.number, 0),
    urls: types.frozen([]),
    subjectsCount: types.optional(types.number, 0)
  })

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

          self.background = linked.backgrounds[0] || {}
          self.classificationsCount = project.classifications_count
          self.classifiersCount = project.classifiers_count
          self.completeness = project.completeness
          self.displayName = project.display_name
          self.id = project.id
          self.retiredSubjectsCount = project.retired_subjects_count
          self.slug = project.slug
          self.subjectsCount = project.subjects_count
          self.urls = project.urls

          self.loadingState = asyncStates.success
        } catch (error) {
          self.error = error.message
          self.loadingState = asyncStates.error
        }
      })
    }
  })

export default Project
