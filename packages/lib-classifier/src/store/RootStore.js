import { configure } from 'mobx'
import {
  addMiddleware,
  getEnv,
  getSnapshot,
  onAction,
  onPatch,
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

const RootStore = types
  .model('RootStore', {
    classifications: types.optional(ClassificationStore, () => ClassificationStore.create({})),
    feedback: types.optional(FeedbackStore, () => FeedbackStore.create({})),
    fieldGuide: types.optional(FieldGuideStore, () => FieldGuideStore.create({})),
    locale: types.optional(types.string, 'en'),
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
      onSubjectChange: () => true,
      onToggleFavourite: () => true
    }
  })

  .actions(self => {
    // Private methods

    function _addMiddleware(call, next, abort) {
      if (call.name === 'setActiveSubject') {
        const res = next(call)
        self.startClassification()
        return res
      }
      return next(call)
    }

    function _onAction(call) {
      if (call.name === 'completeClassification') {
        const annotations = self.classifications.currentAnnotations
        annotations.forEach(annotation => self.feedback.update(annotation))
      }
    }

    function _onPatch(patch) {
      // TODO: why are we doing this rather than observe classifications.loadingState for changes?
      const { path, value } = patch
      if (path === '/classifications/loadingState' && value === 'posting') {
        self.subjects.advance()
      }
    }

    // Public actions
    function afterCreate () {
      addMiddleware(self, _addMiddleware)
      onAction(self, _onAction)
      onPatch(self, _onPatch)
    }

    function setLocale (newLocale) {
      self.locale = newLocale
    }

    function setOnAddToCollection (callback) {
      self.onAddToCollection = callback
    }

    function setOnSubjectChange (callback) {
      self.onSubjectChange = callback
    }

    function setOnToggleFavourite (callback) {
      self.onToggleFavourite = callback
    }

    function startClassification() {
      const { classifications, feedback, projects, subjects, workflows, workflowSteps } = self
      const subject = tryReference(() => subjects?.active)
      const workflow = tryReference(() => workflows?.active)
      const project = tryReference(() => projects?.active)
      if (subject && workflow && project) {
        workflowSteps.resetSteps()
        classifications.reset()
        classifications.createClassification(subject, workflow, project)
        feedback.onNewSubject()
        self.onSubjectChange(getSnapshot(subject))
      }
    }

    return {
      afterCreate,
      setLocale,
      setOnAddToCollection,
      setOnSubjectChange,
      setOnToggleFavourite,
      startClassification
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
