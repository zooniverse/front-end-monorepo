import { getRoot, types } from 'mobx-state-tree'
import Resource from './Resource'
import createLocationCounts from '../helpers/createLocationCounts'
import subjectViewers from '../helpers/subjectViewers'

const Subject = types
  .model('Subject', {
    already_seen: types.optional(types.boolean, false),
    favorite: types.optional(types.boolean, false),
    finished_workflow: types.optional(types.boolean, false),
    locations: types.frozen(),
    metadata: types.frozen(),
    retired: types.optional(types.boolean, false),
    selected_at: types.maybe(types.string),
    selection_state: types.maybe(types.string),
    shouldDiscuss: types.frozen(),
    user_has_finished_workflow: types.optional(types.boolean, false)
  })

  .actions(self => {
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
      addToCollection,
      openInTalk,
      toggleFavorite
    }
  })

  .views(self => ({
    get talkURL () {
      const projectSlug = getRoot(self).projects.active.slug
      const { origin } = window.location
      return `${origin}/projects/${projectSlug}/talk/subjects/${self.id}`
    },

    get viewer () {
      const counts = createLocationCounts(self)

      const workflow = getRoot(self).workflows.active
      const configuration = (workflow && workflow.configuration) || {}
      let viewer = null

      // If the Workflow configuration specifies a subject viewer, use that.
      // Otherwise, take a guess using the Subject.

      if (configuration.subject_viewer === 'lightcurve') {
        viewer = subjectViewers.lightCurve
      } else if (counts.total === 1) {
        if (counts.images) {
          viewer = subjectViewers.singleImage
        }
      }

      return viewer
    }
  }))

export default types.compose('SubjectResource', Resource, Subject)
