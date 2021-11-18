import { autorun, configure } from 'mobx'
import {
  addDisposer,
  addMiddleware,
  getEnv,
  onAction,
  tryReference,
  types,
  setLivelynessChecking
} from 'mobx-state-tree'

import ClassificationStore from './ClassificationStore'
import FeedbackStore from './FeedbackStore'
import FieldGuideStore from './FieldGuideStore'
import ProjectStore from './ProjectStore'
import SubjectStore from './SubjectStore'
import SubjectSetStore from './SubjectSetStore'
import SubjectViewerStore from './SubjectViewerStore'
import TutorialStore from './TutorialStore'
import WorkflowStore from './WorkflowStore'
import WorkflowStepStore from './WorkflowStepStore'
import UserProjectPreferencesStore from './UserProjectPreferencesStore'

// Isolate mobx globals. 
// See: https://github.com/mobxjs/mobx/blob/72d06f8cd2519ce4dbfb807bc13556ca35866690/docs/configuration.md#isolateglobalstate-boolean
configure({ isolateGlobalState: true })

function beforeUnloadListener(event) {
  event.preventDefault()
  return event.returnValue = "You have unsaved work. Are you sure you want to leave?"
}

const RootStore = types
  .model('RootStore', {
    classifications: types.optional(ClassificationStore, () => ClassificationStore.create({})),
    feedback: types.optional(FeedbackStore, () => FeedbackStore.create({})),
    fieldGuide: types.optional(FieldGuideStore, () => FieldGuideStore.create({})),
    projects: types.optional(ProjectStore, () => ProjectStore.create({})),
    subjects: types.optional(SubjectStore, () => SubjectStore.create({})),
    subjectSets: types.optional(SubjectSetStore, () => SubjectSetStore.create({})),
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
    // Private methods
    function _observeWorkInProgress() {
      const subject = tryReference(() => self.subjects.active)
      const { addEventListener, removeEventListener } = window
      if (subject?.stepHistory.checkForProgress) {
        addEventListener && addEventListener("beforeunload", beforeUnloadListener, {capture: true});
      } else {
        removeEventListener && removeEventListener("beforeunload", beforeUnloadListener, {capture: true});
      }
    }

    function onSubjectAdvance () {
      const { classifications, feedback, projects, subjects, workflows, workflowSteps } = self
      const subject = tryReference(() => subjects?.active)
      const workflow = tryReference(() => workflows?.active)
      const project = tryReference(() => projects?.active)
      if (subject && workflow && project) {
        workflowSteps.resetSteps()
        classifications.reset()
        classifications.createClassification(subject, workflow, project)
        feedback.onNewSubject()
      }
    }

    // Public actions
    function afterCreate () {
      createClassificationObserver()
      createSubjectObserver()
      const subjectAnnotationsDisposer = autorun(_observeWorkInProgress)
      addDisposer(self, subjectAnnotationsDisposer)
    }

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onAction(self, (call) => {
          if (call.name === 'completeClassification') {
            const annotations = self.classifications.currentAnnotations
            annotations.forEach(annotation => self.feedback.update(annotation))
          }
        })
      }, { name: 'Root Store Classification Observer autorun' })
      addDisposer(self, classificationDisposer)
    }

    function createSubjectObserver () {
      const subjectDisposer = autorun(() => {
        addMiddleware(self, (call, next, abort) => {
          if (call.name === 'setActiveSubject') {
            const res = next(call)
            onSubjectAdvance()
            return res
          }
          return next(call)
        })
      }, { name: 'Root Store Subject Observer autorun' })
      addDisposer(self, subjectDisposer)
    }

    function setOnAddToCollection (callback) {
      self.onAddToCollection = callback
    }

    function setOnToggleFavourite (callback) {
      self.onToggleFavourite = callback
    }

    return {
      afterCreate,
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
