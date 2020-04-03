import { getRoot, tryReference, types } from 'mobx-state-tree'
import Resource from '../Resource'
import subjectViewers from '@helpers/subjectViewers'
import SingleImageSubject from '../SingleImageSubject'

function validateSubjects (subjects) {
  return subjects.length > 1
}

const SubjectGroup = types
  .model('SubjectGroup', {
    already_seen: types.optional(types.boolean, false),
    favorite: types.optional(types.boolean, false),
    finished_workflow: types.optional(types.boolean, false),
    metadata: types.frozen({}),
    retired: types.optional(types.boolean, false),
    selected_at: types.maybe(types.string),
    selection_state: types.maybe(types.string),
    shouldDiscuss: types.maybe(types.frozen()),
    subjects: types.refinement(types.array(SingleImageSubject), validateSubjects),
    user_has_finished_workflow: types.optional(types.boolean, false),
  })

  .views(self => ({
    get locations () {
      return self.subjects.map(subject => subject.locations[0])
    },

    get talkURL () {
      const project = tryReference(() => getRoot(self).projects?.active)
      if (project) {
        const { origin } = window.location
        return `${origin}/projects/${project.slug}/talk/subjects/${self.id}`
      }

      return ''
    },

    get viewer () {
      return subjectViewers.subjectGroup
    },

    get workflow () {
      return tryReference(() => getRoot(self).workflows?.active)
    }
  }))

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

  

export default types.compose('SubjectGroup', Resource, SubjectGroup)
