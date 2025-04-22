import asyncStates from '@zooniverse/async-states'
import { getRoot, getSnapshot, tryReference, types } from 'mobx-state-tree'
import Resource from '@store/Resource'
import { createLocationCounts, subjectsSeenThisSession, subjectViewers } from '@helpers'
import StepHistory from './StepHistory'
import SubjectLocation from './SubjectLocation'
import MachineLearntReductions from './MachineLearntReductions'
import TranscriptionReductions from './TranscriptionReductions'

const CaesarReductions = types.union(MachineLearntReductions, TranscriptionReductions)

const Subject = types
  .model('Subject', {
    already_seen: types.optional(types.boolean, false),
    favorite: types.optional(types.boolean, false),
    finished_workflow: types.optional(types.boolean, false),
    locations: types.array(SubjectLocation),
    metadata: types.frozen({}),
    retired: types.optional(types.boolean, false),
    selected_at: types.maybe(types.string),
    selection_state: types.maybe(types.string),
    shouldDiscuss: types.maybe(types.frozen()),
    stepHistory: types.maybe(StepHistory),
    user_has_finished_workflow: types.optional(types.boolean, false),
    caesarReductions: types.maybeNull(CaesarReductions),
  })

  .volatile(self => ({
    caesarReductionsLoadedForStep: types.array(types.boolean)
  }))

  .postProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    delete newSnapshot.stepHistory
    return newSnapshot
  })

  .views(self => ({
    get talkURL() {
      if (self.project) {
        const projectSlug = self.project.slug
        const { origin } = window.location
        return `${origin}/projects/${projectSlug}/talk/subjects/${self.id}`
      }

      return ''
    },

    get viewer() {
      let viewer = null
      const counts = createLocationCounts(getSnapshot(self))
      if (self.workflow) {
        const { configuration } = self.workflow

        // If the Workflow configuration specifies a subject viewer, use that.
        // Otherwise, take a guess using the Subject.

        viewer = configuration.viewerType

        // Volumetric Viewer is set at the Project level
        if (!viewer && self.project?.isVolumetricViewer)
          viewer = subjectViewers.volumetric
      
        if (!viewer && counts.total === 1) {
          if (counts.images) {
            viewer = subjectViewers.singleImage
          }
          if (counts.videos) {
            viewer = subjectViewers.singleVideo
          }
          if (counts.json) {
            viewer = subjectViewers.jsonData
          }
          if (counts.text) {
            viewer = subjectViewers.singleText
          }
        }

        if (!viewer && counts.total > 1) {
          // This is a subject pattern for the flipbook - Note that projects that want to use the multiFrame viewer should specify in workflow config
          if (counts.total === counts.images) {
            viewer = subjectViewers.flipbook
          }
          // This is a subject pattern for the image and text viewer
          // Note that workflows with subjects that have the same subject pattern that want to use a different viewer (i.e. light curve viewer)
          // should specify which viewer in the workflow configuration
          if (counts.total === 2 && counts.images === 1 && counts.text === 1) {
            viewer = subjectViewers.imageAndText
          }
        }
      }
      return viewer
    },

    get viewerConfiguration() {
      if (self.workflow) {
        return self.workflow.configuration.subject_viewer_configuration
      }

      return undefined
    },

    get project() {
      return tryReference(() => getRoot(self).projects?.active)
    },

    get workflow() {
      return tryReference(() => getRoot(self).workflows?.active)
    },

    get priority() {
      const priority = self.metadata['#priority'] ?? self.metadata.priority
      if (priority !== undefined) {
        return parseFloat(priority)
      }
      return undefined
    },

    get alreadySeen() {
      return self.already_seen || subjectsSeenThisSession.check(self.workflow?.id, self.id)
    }
  }))

  .actions(self => {
    function addToCollection() {
      const rootStore = getRoot(self)
      rootStore.onAddToCollection(self.id)
    }

    function markAsSeen() {
      self.already_seen = true
    }

    function setCaesarReductions({ reducer, reductions, subjectId, workflowId }) {
      if (reducer) {
        self.caesarReductions = CaesarReductions.create({
          loadingState: asyncStates.success,
          reducer,
          reductions,
          subjectId,
          workflowId
        })
      }
    }

    function startClassification() {
      self.stepHistory = StepHistory.create({})
      self.stepHistory.start()
    }

    function toggleFavorite() {
      const rootStore = getRoot(self)
      self.favorite = !self.favorite
      rootStore.onToggleFavourite(self.id, self.favorite)
    }

    function setCaesarReductionsLoadedForStep(stepIndex) {
      self.caesarReductionsLoadedForStep[stepIndex] = true
    }

    return {
      addToCollection,
      markAsSeen,
      setCaesarReductions,
      startClassification,
      toggleFavorite,
      setCaesarReductionsLoadedForStep
    }
  })

export default types.compose('SubjectResource', Resource, Subject)
