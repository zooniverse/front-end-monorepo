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
    description: types.optional(types.string, ''),
    display_name: types.maybeNull(types.string),
    error: types.frozen({}),
    experimental_tools: types.frozen([]),
    id: types.maybeNull(numberString),
    introduction: types.maybeNull(types.string),
    launch_approved: types.optional(types.boolean, false),
    links: types.maybeNull(types.frozen({})),
    live: types.optional(types.boolean, false),
    loadingState: types.optional(types.enumeration('state', asyncStates.values), asyncStates.initialized),
    researcher_quote: types.optional(types.string, ''),
    owners: types.frozen([]),
    retired_subjects_count: types.optional(types.number, 0),
    slug: types.optional(types.string, ''),
    subjects_count: types.optional(types.number, 0),
    urls: types.frozen([]),
    workflow_description: types.maybeNull(types.string)
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

    get displayName () {
      return self.display_name
    },

    get isComplete () {
      return self.completeness === 1
    },

    get inBeta () {
      return !self.launch_approved && self.beta_approved
    },

    workflowIsActive(workflowId) {
      return self.links['active_workflows'].includes(workflowId)
    }
  }))

export default Project
