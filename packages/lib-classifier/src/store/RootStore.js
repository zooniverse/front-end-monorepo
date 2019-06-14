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
    classifications: types.optional(ClassificationStore, {}),
    dataVisAnnotating: types.optional(DataVisAnnotatingStore, {}),
    drawing: types.optional(DrawingStore, {}),
    feedback: types.optional(FeedbackStore, {}),
    fieldGuide: types.optional(FieldGuideStore, {}),
    projects: types.optional(ProjectStore, {}),
    subjects: types.optional(SubjectStore, {}),
    subjectViewer: types.optional(SubjectViewerStore, {}),
    tutorials: types.optional(TutorialStore, {}),
    workflows: types.optional(WorkflowStore, {}),
    workflowSteps: types.optional(WorkflowStepStore, {}),
    userProjectPreferences: types.optional(UserProjectPreferencesStore, {})
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
