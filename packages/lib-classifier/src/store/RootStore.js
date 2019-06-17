import { getEnv, types, setLivelynessChecking } from 'mobx-state-tree'

import ClassificationStore from './ClassificationStore'
import DataVisAnnotatingStore from './DataVisAnnotatingStore'
import DrawingStore from './DrawingStore'
import FeedbackStore from './FeedbackStore'
import FieldGuideStore from './FieldGuideStore'
import ProjectStore from './ProjectStore'
import SubjectStore from './SubjectStore'
import SubjectViewerStore from './SubjectViewerStore'
import TutorialStore from './TutorialStore'
import WorkflowStore from './WorkflowStore'
import WorkflowStepStore from './WorkflowStepStore'
import UserProjectPreferencesStore from './UserProjectPreferencesStore'

const RootStore = types
  .model('RootStore', {
    classifications: types.optional(ClassificationStore, () => ClassificationStore.create({})),
    dataVisAnnotating: types.optional(DataVisAnnotatingStore, () => DataVisAnnotatingStore.create({})),
    drawing: types.optional(DrawingStore, () => DrawingStore.create({})),
    feedback: types.optional(FeedbackStore, () => FeedbackStore.create({})),
    fieldGuide: types.optional(FieldGuideStore, () => FieldGuideStore.create({})),
    projects: types.optional(ProjectStore, () => ProjectStore.create({})),
    subjects: types.optional(SubjectStore, () => SubjectStore.create({})),
    subjectViewer: types.optional(SubjectViewerStore, () => SubjectViewerStore.create({})),
    tutorials: types.optional(TutorialStore, () => TutorialStore.create({})),
    workflows: types.optional(WorkflowStore, () => WorkflowStore.create({})),
    workflowSteps: types.optional(WorkflowStepStore, () => WorkflowStepStore.create({})),
    userProjectPreferences: types.optional(UserProjectPreferencesStore, () => UserProjectPreferencesStore.create({}))
  })

  .volatile(self => {
    return {
      onAddToCollection: () => true,
      onToggleFavourite: () => true
    }
  })

  .actions(self => {
    function setOnAddToCollection (callback) {
      self.onAddToCollection = callback
    }

    function setOnToggleFavourite (callback) {
      self.onToggleFavourite = callback
    }

    return {
      setOnAddToCollection,
      setOnToggleFavourite
    }
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
