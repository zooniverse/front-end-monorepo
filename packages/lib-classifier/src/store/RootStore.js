import { getEnv, types, setLivelynessChecking } from 'mobx-state-tree'

import ClassificationStore from './ClassificationStore'
import DrawingStore from './DrawingStore'
import ProjectStore from './ProjectStore'
import SubjectStore from './SubjectStore'
import SubjectViewerStore from './SubjectViewerStore'
import WorkflowStore from './WorkflowStore'
import WorkflowStepStore from './WorkflowStepStore'
// import UserProjectPreferencesStore from './UserProjectPreferencesStore';

const RootStore = types
  .model('RootStore', {
    classifications: types.optional(ClassificationStore, ClassificationStore.create()),
    drawing: types.optional(DrawingStore, DrawingStore.create()),
    projects: types.optional(ProjectStore, ProjectStore.create()),
    subjects: types.optional(SubjectStore, SubjectStore.create()),
    subjectViewer: types.optional(SubjectViewerStore, SubjectViewerStore.create()),
    workflows: types.optional(WorkflowStore, WorkflowStore.create()),
    workflowSteps: types.optional(WorkflowStepStore, WorkflowStepStore.create()),
    // userProjectPreferences: types.optional(UserProjectPreferencesStore, UserProjectPreferencesStore.create())
  })

  .views(self => ({
    get authClient () {
      return getEnv(self).authClient
    },
    get client () {
      return getEnv(self).client
    }
  }))

// Forces MST warnings to throw as errors instead with full stack trace
// Easier for debugging...
if (process.env.NODE_ENV === 'development') setLivelynessChecking('error')

export default RootStore
