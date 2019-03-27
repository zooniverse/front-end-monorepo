import { autorun } from 'mobx'
import { addDisposer, getRoot, types, flow } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import ResourceStore from './ResourceStore'
import FieldGuide from './FieldGuide'
import Medium from './Medium'

const FieldGuideStore = types
  .model('FieldGuideStore', {
    active: types.maybe(types.reference(FieldGuide)),
    activeMedium: types.maybe(types.reference(Medium)),
    activeItem: types.maybe(types.integer),
    attachedMedia: types.map(Medium),
    resources: types.map(FieldGuide),
    showModal: types.optional(types.boolean, false),
    type: types.optional(types.string, 'field_guides')
  })

  .actions(self => {
    function afterAttach() {
      createProjectObserver()
    }

    function createProjectObserver() {
      const projectDisposer = autorun(() => {
        const project = getRoot(self).projects.active
        if (project) {
          self.reset()
          flow(self.fetchFieldGuide)()
        }
      })
      addDisposer(self, projectDisposer)
    }

    function reset () {
      self.active = undefined
      self.resources.clear()
      self.activeMedium = undefined
      self.attachedMedia.clear()
      self.activeItem = undefined
      self.showModal = false
    }

    // TODO: this might need to paginate for field guides that have 20+ items
    function * fetchMedia (fieldGuide) {
      const { type } = self
      const { panoptes } = getRoot(self).client
      if (fieldGuide) {
        self.loadingState = asyncStates.loading
        try {
          const url = `${type}/${fieldGuide.id}/attached_images`
          const response = yield panoptes.get(url)
          const { media } = response.body
          if (media && media.length > 0) self.setMediaResources(media)
        } catch (error) {
          // We're not setting the store state to error because
          // we do not want to prevent the tutorial from rendering
          console.error(error)
        }
      }
    }

    function setMediaResources (media) {
      media.forEach(medium => self.attachedMedia.put(medium))
    }

    // TODO: move req in panoptes.js
    function * fetchFieldGuide () {
      const { type } = self
      const project = getRoot(self).projectss.active
      const { panoptes } = getRoot(self).client

      self.loadingState = asyncStates.loading
      try {
        const response = yield panoptes.get(`${type}`, { project_id: project.id })
        const fieldGuide = response.body[type][0]
        if (fieldGuide) {
          yield flow(self.fetchMedia)(fieldGuide)
          self.resources = fieldGuide
          self.active = fieldGuide.id
          self.loadingState = asyncStates.success
        } else {
          self.loadingState = asyncStates.success
        }
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function setModalVisibility (boolean) {
      self.showModal = boolean
    }

    function setActiveItem (index) {
      if (fieldGuide && fieldGuide.items[index]) self.activeItem = index
    }

    return {
      afterAttach,
      reset,
      setActiveItem,
      setMediaResources,
      setModalVisibility
    }
  })

export default types.compose('FieldGuideResourceStore', ResourceStore, FieldGuideStore)
