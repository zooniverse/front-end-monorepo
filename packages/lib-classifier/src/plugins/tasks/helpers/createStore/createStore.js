import asyncStates from '@zooniverse/async-states'
import { types } from 'mobx-state-tree'
import ClassificationStore from '@store/ClassificationStore'
import SubjectStore from '@store/SubjectStore'
import SubjectViewerStore from '@store/SubjectViewerStore'
import WorkflowStore from '@store/WorkflowStore'
import WorkflowStepStore from '@store/WorkflowStepStore'

export default function createStore() {
  const classifications = ClassificationStore.create()
  const mockSubject = {
    id: 'subject',
    metadata: {}
  }
  const mockWorkflow = {
    id: 'workflow',
    version: '1.0'
  }
  const mockProject = {
    id: 'project'
  }

  const store = types.model('MockStore', {
    classifications: ClassificationStore,
    subjects: SubjectStore,
    subjectViewer: SubjectViewerStore,
    workflows: WorkflowStore,
    workflowSteps: WorkflowStepStore
  })
    .create({
      classifications,
      subjects: SubjectStore.create({}),
      subjectViewer: SubjectViewerStore.create({ loadingState: asyncStates.success }),
      workflows: WorkflowStore.create({}),
      workflowSteps: WorkflowStepStore.create({})
    })
  classifications.createClassification(mockSubject, mockWorkflow, mockProject)
  return store
}