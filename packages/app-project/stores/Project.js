import asyncStates from '@zooniverse/async-states'
import { getRoot, types } from 'mobx-state-tree'

import numberString from './types/numberString'

const Project = types
  .model('Project', {
    about_pages: types.frozen([]),
    avatar: types.frozen({}),
    background: types.frozen({}),
    beta_approved: types.optional(types.boolean, false),
    beta_requested: types.optional(types.boolean, false),
    classifications_count: types.optional(types.number, 0),
    classifiers_count: types.optional(types.number, 0),
    configuration: types.frozen({}),
    completeness: types.optional(types.number, 0),
    error: types.frozen({}),
    experimental_tools: types.frozen([]),
    id: types.maybeNull(numberString),
    launch_approved: types.optional(types.boolean, false),
    links: types.maybeNull(types.frozen({})),
    live: types.optional(types.boolean, false),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    primary_language: types.optional(types.string, 'en'),
    owners: types.frozen([]),
    retired_subjects_count: types.optional(types.number, 0),
    slug: types.optional(types.string, ''),
    strings: types.frozen({}),
    subjects_count: types.optional(types.number, 0),
    urls: types.frozen([])
  })

  .views(self => ({
    get baseUrl() {
      return `/${self.slug}`
    },

    get defaultWorkflow() {
      const activeWorkflows = self.links['active_workflows']
      let singleActiveWorkflow
      if (activeWorkflows.length === 1) {
        [singleActiveWorkflow] = self.links['active_workflows']
      }
      return singleActiveWorkflow
    },

    get description () {
      return self.strings?.description
    },

    get display_name () {
      return self.strings?.display_name
    },

    get displayName () {
      return self.display_name
    },

    get introduction () {
      return self.strings?.introduction
    },

    get isComplete () {
      return self.completeness === 1
    },

    get inBeta () {
      return !self.launch_approved && self.beta_approved
    },

    get researcher_quote () {
      return self.strings?.researcher_quote
    },

    get title () {
      return self.strings?.title
    },

    get workflow_description () {
      return self.strings?.workflow_description
    },

    workflowIsActive(workflowId) {
      return self.links['active_workflows'].includes(workflowId)
    }
  }))

export default Project
