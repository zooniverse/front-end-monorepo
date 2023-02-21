import asyncStates from '@zooniverse/async-states'
import { destroy, getRoot, getType, tryReference, types } from 'mobx-state-tree'
import Resource from '@store/Resource'
import { createLocationCounts, subjectsSeenThisSession, subjectViewers, validateSubjectLocations } from '@helpers'
import StepHistory from './StepHistory'
import TranscriptionReductions from './TranscriptionReductions'

const CaesarReductions = types.union(TranscriptionReductions)

const Subject = types
  .model('Subject', {
    already_seen: types.optional(types.boolean, false),
    favorite: types.optional(types.boolean, false),
    finished_workflow: types.optional(types.boolean, false),
    locations: types.refinement('SubjectLocations', types.frozen([]), validateSubjectLocations),
    metadata: types.frozen({}),
    retired: types.optional(types.boolean, false),
    selected_at: types.maybe(types.string),
    selection_state: types.maybe(types.string),
    shouldDiscuss: types.maybe(types.frozen()),
    stepHistory: types.maybe(StepHistory),
    user_has_finished_workflow: types.optional(types.boolean, false),
    caesarReductions: types.maybeNull(CaesarReductions)
  })

  .postProcessSnapshot(snapshot => {
    const newSnapshot = Object.assign({}, snapshot)
    delete newSnapshot.stepHistory
    return newSnapshot
  })

  .views(self => ({
    get talkURL () {
      if (self.project) {
        const projectSlug = self.project.slug
        const { origin } = window.location
        return `${origin}/projects/${projectSlug}/talk/subjects/${self.id}`
      }

      return ''
    },

    get viewer () {
      let viewer = null
      const counts = createLocationCounts(self)
      if (self.workflow) {
        const { configuration } = self.workflow

        // If the Workflow configuration specifies a subject viewer, use that.
        // Otherwise, take a guess using the Subject.

        viewer = configuration.viewerType

        if (!viewer && counts.total === 1) {
          if (counts.images) {
            viewer = subjectViewers.singleImage
          }
          if (counts.videos) {
            viewer = subjectViewers.singleVideo
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
          if (getType(self).name === 'ImageAndTextSubject') {
            viewer = subjectViewers.imageAndText
          }
        }
      }
      return viewer
    },

    get viewerConfiguration () {
      if (self.workflow) {
        return self.workflow.configuration.subject_viewer_configuration
      }

      return undefined
    },

    get project () {
      return tryReference(() => getRoot(self).projects?.active)
    },

    get workflow () {
      return tryReference(() => getRoot(self).workflows?.active)
    },

    get priority () {
      const priority = self.metadata['#priority'] ?? self.metadata.priority
      if (priority !== undefined) {
        return parseFloat(priority)
      }
      return undefined
    },

    get alreadySeen () {
      return self.already_seen || subjectsSeenThisSession.check(self.workflow?.id, self.id)
    }
  }))

  .actions(self => {
    function addToCollection () {
      const rootStore = getRoot(self)
      rootStore.onAddToCollection(self.id)
    }

    function markAsSeen() {
      self.already_seen = true
    }

    function openInTalk (newTab = false) {
      self.shouldDiscuss = {
        newTab,
        url: self.talkURL
      }
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

    function toggleFavorite () {
      const rootStore = getRoot(self)
      self.favorite = !self.favorite
      rootStore.onToggleFavourite(self.id, self.favorite)
    }

    return {
      addToCollection,
      markAsSeen,
      openInTalk,
      setCaesarReductions,
      startClassification,
      toggleFavorite
    }
  })

export default types.compose('SubjectResource', Resource, Subject)
