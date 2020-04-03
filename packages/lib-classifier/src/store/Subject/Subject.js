import { autorun } from 'mobx'
import { addDisposer, destroy, getRoot, tryReference, types } from 'mobx-state-tree'
import Resource from '../Resource'
import createLocationCounts from '@helpers/createLocationCounts'
import subjectViewers from '@helpers/subjectViewers'
import TranscriptionReductions from '../TranscriptionReductions'

const Subject = types
  .model('Subject', {
    already_seen: types.optional(types.boolean, false),
    favorite: types.optional(types.boolean, false),
    finished_workflow: types.optional(types.boolean, false),
    locations: types.frozen([]),
    metadata: types.frozen({}),
    retired: types.optional(types.boolean, false),
    selected_at: types.maybe(types.string),
    selection_state: types.maybe(types.string),
    shouldDiscuss: types.maybe(types.frozen()),
    user_has_finished_workflow: types.optional(types.boolean, false),
    transcriptionReductions: types.maybe(TranscriptionReductions)
  })

  .actions(self => {
    function afterAttach () {
      fetchTranscriptionReductions()
    }

    function beforeDestroy () {
      self.transcriptionReductions && destroy(self.transcriptionReductions)
    }

    function fetchTranscriptionReductions () {
      const subjectWorkflowDisposer = autorun(function subjectWorkflowDisposer () {
        if (self.workflow && self.workflow.usesTranscriptionTask) {
          self.transcriptionReductions = TranscriptionReductions.create({
            subjectId: self.id,
            workflowId: self.workflow.id
          })
        }
      }, { name: 'Subject workflow disposer' })
      addDisposer(self, subjectWorkflowDisposer)
    }

    function addToCollection () {
      const rootStore = getRoot(self)
      rootStore.onAddToCollection(self.id)
    }

    function openInTalk (newTab = false) {
      self.shouldDiscuss = {
        newTab,
        url: self.talkURL
      }
    }

    function toggleFavorite () {
      const rootStore = getRoot(self)
      self.favorite = !self.favorite
      rootStore.onToggleFavourite(self.id, self.favorite)
    }

    return {
      afterAttach,
      beforeDestroy,
      addToCollection,
      openInTalk,
      toggleFavorite
    }
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

        const pfeMultiImageMode = configuration['multi_image_mode'] === 'separate'
        const pfeEnableSwitchingFlipbookAndSeparate = configuration['enable_switching_flipbook_and_separate'] // expect true/false value
        const nullViewer = pfeMultiImageMode || pfeEnableSwitchingFlipbookAndSeparate

        viewer = configuration.viewerType

        if (!viewer && counts.total === 1) {
          if (counts.images) {
            viewer = subjectViewers.singleImage
          }
        }

        if (!viewer && counts.total > 1 && counts.total < 11) {
          if (!nullViewer) {
            viewer = subjectViewers.multiFrame
          }
        }
      }
      return viewer
    },

    get project () {
      return tryReference(() => getRoot(self).projects?.active)
    },

    get workflow () {
      return tryReference(() => getRoot(self).workflows?.active)
    }
  }))

export default types.compose('SubjectResource', Resource, Subject)
