import asyncStates from '@zooniverse/async-states'
import { Factory } from 'rosie'
import sinon from 'sinon'

import RootStore from '@store'
import { SubjectFactory, SubjectSetFactory, ProjectFactory, WorkflowFactory } from '@test/factories'
import stubPanoptesJs from '@test/stubPanoptesJs'

import branchingWorkflow from './branchingWorkflow'

export const defaultClient = {
  caesar: { request: sinon.stub().callsFake(() => Promise.resolve({})) },
  tutorials: {
    get: sinon.stub().callsFake(() =>
      Promise.resolve({ body: {
        tutorials: []
      }})
    )
  }
}

export const defaultAuthClient = {
  checkBearerToken: sinon.stub().callsFake(() => Promise.resolve(null)),
  checkCurrent: sinon.stub().callsFake(() => Promise.resolve(null))
}

/** build a mock store, with a branching workflow, steps, tasks and subjects. */
export default function mockStore({
  authClient = defaultAuthClient,
  client = defaultClient,
  project,
  subject,
  subjectSet,
  workflow = branchingWorkflow
} = {}) {

  const subjectSnapshot = subject || SubjectFactory.build({
    metadata: {}
  })

  const subjectSetSnapshot = subjectSet || SubjectSetFactory.build()

  const workflowSnapshot = workflow || WorkflowFactory.build()

  const projectSnapshot = project || ProjectFactory.build({}, {
    activeWorkflowId: workflowSnapshot.id
  })

  const subjectResources = { [subjectSnapshot.id]: subjectSnapshot }
  Factory
    .buildList('subject', 9)
    .forEach(subject => subjectResources[subject.id] = subject)

  const { panoptes } = stubPanoptesJs({
    field_guides: [],
    projects: [projectSnapshot],
    subjects: Object.values(subjectResources),
    tutorials: [],
    workflows: [workflowSnapshot]
  })

  const rootStore = RootStore.create({
    projects: {
      active: projectSnapshot.id,
      loadingState: asyncStates.success,
      resources: {
        [projectSnapshot.id]: projectSnapshot
      }
    },
    subjects: {
      active: subjectSnapshot.id,
      loadingState: asyncStates.success,
      queue: Object.keys(subjectResources),
      resources: subjectResources
    },
    subjectSets: {
      active: subjectSetSnapshot.id,
      loadingState: asyncStates.success,
      resources: {
        [subjectSetSnapshot.id]: subjectSetSnapshot
      }
    },
    workflows: {
      active: workflowSnapshot.id,
      loadingState: asyncStates.success,
      resources: {
        [workflowSnapshot.id]: workflowSnapshot
      }
    }
  }, {
    authClient: { ...defaultAuthClient, ...authClient },
    client: { ...defaultClient, panoptes, ...client }
  })
  rootStore.subjects.setActiveSubject(subjectSnapshot.id)
  return rootStore
}