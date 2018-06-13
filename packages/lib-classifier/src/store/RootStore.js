import { getEnv, types } from 'mobx-state-tree'
import ProjectStore from './ProjectStore'
import SubjectStore from './SubjectStore'
import WorkflowStore from './WorkflowStore'

const RootStore = types
  .model('RootStore', {
    projects: types.optional(ProjectStore, ProjectStore.create({ type: 'projects' })),
    subjects: types.optional(SubjectStore, SubjectStore.create({ type: 'subjects' })),
    workflows: types.optional(WorkflowStore, WorkflowStore.create({ type: 'workflows' }))
  })

  .views(self => ({
    get client () {
      return getEnv(self).client
    }
  }))

export default RootStore
