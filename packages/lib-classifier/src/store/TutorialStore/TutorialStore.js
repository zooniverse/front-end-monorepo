import { autorun } from 'mobx'
import { addDisposer, getRoot, isValidReference, tryReference, types, flow } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'

import ResourceStore from '@store/ResourceStore'
import Medium from '@store/Medium'
import Tutorial from './Tutorial'

const TutorialStore = types
  .model('TutorialStore', {
    active: types.safeReference(Tutorial),
    activeMedium: types.safeReference(Medium),
    activeStep: types.optional(types.integer, 0),
    attachedMedia: types.map(Medium),
    resources: types.map(Tutorial),
    type: types.optional(types.string, 'tutorials')
  })

  .views(self => ({
    get isActiveReferenceValid () {
      return isValidReference(() => self.active)
    },

    get isActiveStepValid () {
      return self.isActiveReferenceValid && self.activeStep > -1
    },

    get disableTutorialTab () {
      return self.loadingState !== asyncStates.success || (self.loadingState === asyncStates.success && !self.tutorial)
    },

    stepWithMedium(index) {
      const tutorial = tryReference(() => self.active)
      const step = tutorial?.steps[index]
      if (step) {
        const medium = self.attachedMedia.get(step.media)
        return { step, medium }
      }
      return {}
    },

    get tutorial () {
      const tutorials = Array.from(self.resources.values())
      // For backwards compatibility, we assume tutorials with a null kind are standard tutorials
      if (tutorials) {
        return tutorials.find((tutorial) => {
          return tutorial.kind === 'tutorial' || tutorial.kind === null
        })
      }

      return null
    },

    get miniCourse () {
      const tutorials = Array.from(self.resources.values())

      if (tutorials) {
        return tutorials.find((tutorial) => {
          return tutorial.kind === 'mini-course'
        })
      }

      return null
    },

    isMiniCourseCompleted (lastStepSeen) {
      const { miniCourse } = self

      if (miniCourse) return lastStepSeen === miniCourse.steps.length - 1

      return false
    }
  }))

  .actions(self => {
    function _onWorkflowChange() {
      const workflow = tryReference(() => getRoot(self).workflows.active)
      if (workflow) {
        self.reset()
        self.fetchTutorials()
      }
    }

    function afterAttach () {
      addDisposer(self, autorun(_onWorkflowChange))
    }

    const fetchMedia = flow(function * fetchMedia (tutorial) {
      const { tutorials } = getRoot(self).client
      if (tutorial) {
        self.loadingState = asyncStates.loading
        try {
          const response = yield tutorials.getAttachedImages({ id: tutorial.id })
          const { media } = response.body
          if (media && media.length > 0) self.setMediaResources(media)
        } catch (error) {
          // We're not setting the store state to error because
          // we do not want to prevent the tutorial from rendering
          console.error(error)
        }
      }
    })

    function setMediaResources (media) {
      media.forEach(medium => self.attachedMedia.put(medium))
    }

    // This could use a refactor after Panoptes bug with using include to get attached images is fixed
    // See comments in the commonRequests.js file for tutorials in panoptes.js
    function * fetchTutorials () {
      const workflow = getRoot(self).workflows.active
      const tutorialsClient = getRoot(self).client.tutorials
      const upp = getRoot(self).userProjectPreferences

      self.loadingState = asyncStates.loading
      try {
        const response = yield tutorialsClient.get({ workflowId: workflow.id })
        const { tutorials } = response.body
        if (tutorials && tutorials.length > 0) {
          const mediaRequests = tutorials.map(fetchMedia)
          yield Promise.all(mediaRequests)
          self.setTutorials(tutorials)
          self.loadingState = asyncStates.success
        } else {
          self.loadingState = asyncStates.success
        }
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function setTutorials (tutorials) {
      tutorials.forEach(tutorial => self.resources.put(tutorial))
      const { tutorial } = self
      self.active = tutorial?.id
    }

    function setActiveTutorial(tutorialID) {
      const tutorial = tryReference(() => self.active)

      if (!tutorialID) {
        self.resetActiveTutorial()
        return
      }

      if (tutorialID !== tutorial?.id){
        self.active = tutorialID
        return
      }
    }

    function resetActiveTutorial () {
      // we manually set active and activeMedium to undefined
      // because we are not removing the tutorial from the map
      self.active = undefined
      self.activeStep = 0
      self.activeMedium = undefined
    }

    return {
      afterAttach,
      fetchTutorials: flow(fetchTutorials),
      resetActiveTutorial,
      setActiveTutorial,
      setMediaResources,
      setTutorials
    }
  })

export default types.compose('TutorialResourceStore', ResourceStore, TutorialStore)
