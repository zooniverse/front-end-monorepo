import { getEnv, types } from 'mobx-state-tree'
import ClassificationStore from './ClassificationStore'
import ClassifierStore from './ClassifierStore'
import ProjectStore from './ProjectStore'
import SubjectStore from './SubjectStore'
import TasksStore from './TasksStore'
import WorkflowStore from './WorkflowStore'

const RootStore = types
  .model('RootStore', {
    classification: types.optional(ClassificationStore, ClassificationStore.create()),
    classifier: types.optional(ClassifierStore, ClassifierStore.create()),
    projects: types.optional(ProjectStore, ProjectStore.create()),
    subjects: types.optional(SubjectStore, SubjectStore.create()),
    tasks: types.optional(TasksStore, TasksStore.create()),
    workflows: types.optional(WorkflowStore, WorkflowStore.create())
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

export default RootStore
