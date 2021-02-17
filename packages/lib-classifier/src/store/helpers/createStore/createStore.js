import asyncStates from '@zooniverse/async-states'
import { types } from 'mobx-state-tree'
import ClassificationStore from '../..//ClassificationStore'
import ProjectStore from '../..//ProjectStore'
import SubjectStore from '../..//SubjectStore'
import SubjectViewerStore from '../..//SubjectViewerStore'
import WorkflowStore from '../..//WorkflowStore'
import WorkflowStepStore from '../..//WorkflowStepStore'

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
    projects: ProjectStore,
    subjects: SubjectStore,
    subjectViewer: SubjectViewerStore,
    workflows: WorkflowStore,
    workflowSteps: WorkflowStepStore
  })
    .create({
      classifications,
      projects: ProjectStore.create({}),
      subjects: SubjectStore.create({}),
      subjectViewer: SubjectViewerStore.create({ loadingState: asyncStates.success }),
      workflows: WorkflowStore.create({}),
      workflowSteps: WorkflowStepStore.create({})
    })
  classifications.createClassification(mockSubject, mockWorkflow, mockProject)
  return store
}
