import { getEnv, types } from 'mobx-state-tree'

import ClassificationStore from './ClassificationStore'
import DrawingStore from './DrawingStore'
import ProjectStore from './ProjectStore'
import SubjectStore from './SubjectStore'
import SubjectViewerStore from './SubjectViewerStore'
import WorkflowStore from './WorkflowStore'
import WorkflowStepStore from './WorkflowStepStore'

const RootStore = types
  .model('RootStore', {
    classifications: types.optional(ClassificationStore, ClassificationStore.create()),
    drawing: types.optional(DrawingStore, DrawingStore.create()),
    projects: types.optional(ProjectStore, ProjectStore.create()),
    steps: types.optional(WorkflowStepStore, WorkflowStepStore.create()),
    subjects: types.optional(SubjectStore, SubjectStore.create()),
    subjectViewer: types.optional(SubjectViewerStore, SubjectViewerStore.create()),
    workflows: types.optional(WorkflowStore, WorkflowStore.create()),
    workflowSteps: types.optional(WorkflowStepStore, WorkflowStepStore.create())
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

export default RootStore
