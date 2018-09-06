import { getEnv, types } from 'mobx-state-tree'
import ClassifierStore from './ClassifierStore'
import ProjectStore from './ProjectStore'
import SubjectStore from './SubjectStore'
import WorkflowStore from './WorkflowStore'
import WorkflowStepStore from './WorkflowStepStore'

const RootStore = types
  .model('RootStore', {
    classifier: types.optional(ClassifierStore, ClassifierStore.create()),
    projects: types.optional(ProjectStore, ProjectStore.create()),
    steps: types.optional(WorkflowStepStore, WorkflowStepStore.create()),
    subjects: types.optional(SubjectStore, SubjectStore.create()),
    workflows: types.optional(WorkflowStore, WorkflowStore.create())
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

export default RootStore
