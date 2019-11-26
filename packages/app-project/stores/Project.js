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
    configuration: types.frozen({}),
    completeness: types.optional(types.number, 0),
    description: types.optional(types.string, ''),
    display_name: types.maybeNull(types.string),
    error: types.optional(types.frozen({}), {}),
    experimental_tools: types.frozen([]),
    id: types.maybeNull(numberString),
    introduction: types.maybeNull(types.string),
    launch_approved: types.optional(types.boolean, false),
    links: types.maybeNull(types.frozen({})),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    researcher_quote: types.maybeNull(types.string),
    owners: types.frozen([]),
    retired_subjects_count: types.optional(types.number, 0),
    slug: types.optional(types.string, ''),
    urls: types.frozen([]),
    subjects_count: types.optional(types.number, 0),
    workflow_description: types.maybeNull(types.string)
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

      fetch: flow(function * fetch (slug, params) {
        self.loadingState = asyncStates.loading
        try {
          const query = { ...params, slug }
          const response = yield client.getWithLinkedResources({ query })
          const project = response.body.projects[0]
          if (!project) throw new Error(`${slug} could not be found`)

          const linked = response.body.linked

          self.avatar = get(linked, 'avatars[0]', {})
          self.background = get(linked, 'backgrounds[0]', {})
          self.owners = get(linked, 'owners', [])

          const properties = [
            'classifications_count',
            'classifiers_count',
            'completeness',
            'configuration',
            'description',
            'display_name',
            'experimental_tools',
            'id',
            'introduction',
            'launch_approved',
            'links',
            'researcher_quote',
            'retired_subjects_count',
            'slug',
            'subjects_count',
            'urls',
            'workflow_description'
          ]
          properties.forEach(property => { self[property] = project[property] })

          self.loadingState = asyncStates.success
        } catch (error) {
          console.error('Error loading project:', error)
          self.error = error
          self.loadingState = asyncStates.error
        }
      })
    }
  })

export default Project
