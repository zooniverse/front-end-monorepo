import { autorun } from 'mobx'
import { addDisposer, getRoot, tryReference, types, flow } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import ResourceStore from '@store/ResourceStore'
import FieldGuide from './FieldGuide'
import Medium from '@store/Medium'

const FieldGuideStore = types
  .model('FieldGuideStore', {
    active: types.safeReference(FieldGuide),
    attachedMedia: types.map(Medium),
    resources: types.map(FieldGuide),
    type: types.optional(types.string, 'field_guides')
  })

  .actions(self => {
    function afterAttach () {
      createProjectObserver()
    }

    function _onProjectChange() {
      const project = tryReference(() => getRoot(self).projects.active)
      if (!self.loaded && project) {
        self.reset()
        self.fetchFieldGuide(project.id)
      }
    }
    function createProjectObserver () {
      const projectDisposer = autorun(_onProjectChange)
      addDisposer(self, projectDisposer)
    }

    function reset () {
      self.resources.clear()
      self.attachedMedia.clear()
    }

    // TODO: this might need to paginate for field guides that have 20+ items
    const fetchMedia = flow(function * fetchMedia (fieldGuide) {
      const { type } = self
      const client = getRoot(self).client.panoptes
      if (fieldGuide) {
        self.loadingState = asyncStates.loading
        try {
          const url = `/${type}/${fieldGuide.id}/attached_images`
          const response = yield client.get(url)
          const { media } = response.body
          if (media && media.length > 0) self.setMediaResources(media)
        } catch (error) {
          // We're not setting the store state to error because
          // we do not want to prevent the field guide from rendering
          if (process.browser) {
            console.error(error)
          }
        }
      }
    })

    function setMediaResources (media) {
      media.forEach(medium => self.attachedMedia.put(medium))
    }

    // TODO: move req in panoptes.js
    function * fetchFieldGuide (projectID) {
      const { type } = self
      const client = getRoot(self).client.panoptes

      self.loadingState = asyncStates.loading
      try {
        const response = yield client.get(`/${type}`, { project_id: projectID })
        const fieldGuide = response.body[type][0]
        if (fieldGuide) {
          yield fetchMedia(fieldGuide)
          self.setResources([fieldGuide])
          self.setActive(fieldGuide.id)
          self.loadingState = asyncStates.success
        } else {
          self.loadingState = asyncStates.success
        }
      } catch (error) {
        if (process.browser) {
          console.error(error)
        }
        self.loadingState = asyncStates.error
      }
    }

    return {
      afterAttach,
      fetchFieldGuide: flow(fetchFieldGuide),
      reset,
      setMediaResources
    }
  })

export default types.compose('FieldGuideResourceStore', ResourceStore, FieldGuideStore)
