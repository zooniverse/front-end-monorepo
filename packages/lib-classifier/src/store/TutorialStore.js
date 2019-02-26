import { autorun } from 'mobx'
import { addDisposer, getRoot, types, flow } from 'mobx-state-tree'
import asyncStates from '@zooniverse/async-states'
import ResourceStore from './ResourceStore'
import Tutorial from './Tutorial'
import Medium from './Medium'

const TutorialStore = types
  .model('TutorialStore', {
    active: types.maybe(types.reference(Tutorial)),
    activeMedium: types.maybe(types.reference(Medium)),
    activeStep: types.maybe(types.integer),
    attachedMedia: types.map(Medium),
    resources: types.map(Tutorial),
    tutorialSeenTime: types.maybe(types.string),
    miniCourseSeenTime: types.maybe(types.string),
    type: types.optional(types.string, 'tutorials')
  })

  .views(self => ({
    get disableTutorialTab () {
      return self.loadingState !== asyncStates.success || (self.loadingState === asyncStates.success && !self.tutorial)
    },

    get stepWithMedium () {
      // The step index can be 0, but that is falsey, so convert to a string for conditional evaluation
      if (!!self.active && !!self.activeStep.toString()) {
        const step = self.active.steps[self.activeStep]
        return { step, medium: self.activeMedium }
      }
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
    }

    // Stubbed out getter for returning the linked mini-course if there is one
    // Uncomment this to use when minicourse UI is added
    // get miniCourse() {
    // if (tutorials) {
    //   return tutorials.find((tutorial) => {
    //     return tutorial.kind === 'mini-course'
    //   })
    // }

    // return null
    // }
  }))

  .actions(self => {
    function afterAttach () {
      createWorkflowObserver()
    }

    function createWorkflowObserver () {
      const workflowDisposer = autorun(() => {
        const workflow = getRoot(self).workflows.active
        if (workflow) {
          self.reset()
          self.resetSeen()
          self.fetchTutorials()
        }
      })
      addDisposer(self, workflowDisposer)
    }

    function * fetchMedia (tutorial) {
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
    }

    function setMediaResources (media) {
      media.forEach(medium => self.attachedMedia.put(medium))
    }

    // This could use a refactor after Panoptes bug with using include to get attached images is fixed
    // See comments in the commonRequests.js file for tutorials in panoptes.js
    function * fetchTutorials () {
      const workflow = getRoot(self).workflows.active
      const tutorialsClient = getRoot(self).client.tutorials
      self.loadingState = asyncStates.loading
      try {
        const response = yield tutorialsClient.get({ workflowId: workflow.id })
        const { tutorials } = response.body
        if (tutorials && tutorials.length > 0) {
          tutorials.forEach(tutorial => self.fetchMedia(tutorial))
          self.setTutorials(tutorials)
        }
        self.loadingState = asyncStates.success
      } catch (error) {
        console.error(error)
        self.loadingState = asyncStates.error
      }
    }

    function setTutorials (tutorials) {
      tutorials.forEach(tutorial => self.resources.put(tutorial))
    }

    function setTutorialStep (stepIndex = 0) {
      if (self.active) {
        const { steps } = self.active
        self.activeMedium = undefined
        if (stepIndex < steps.length) {
          self.activeStep = stepIndex
          if (steps[stepIndex].media) self.activeMedium = steps[stepIndex].media
        }
      }
    }

    function setActiveTutorial (id, stepIndex) {
      if (!id) return self.resetActiveTutorial()

      self.active = id
      self.setTutorialStep(stepIndex)
      self.setSeenTime()
    }

    function setSeenTime () {
      const tutorial = self.active
      const seen = new Date().toISOString()
      if (tutorial) {
        if (tutorial.kind === 'tutorial' || tutorial.kind === null) {
          self.tutorialSeenTime = seen
        }

        if (tutorial.kind === 'mini-course') {
          self.miniCourseSeenTime = seen
        }
      }
    }

    function resetActiveTutorial () {
      self.active = undefined
      self.activeStep = undefined
      self.activeMedium = undefined
    }

    function resetSeen (type) {
      if (type === 'tutorial') {
        self.tutorialSeenTime = undefined
      } else if (type === 'mini-course') {
        self.miniCourseSeenTime = undefined
      } else {
        self.tutorialSeenTime = undefined
        self.miniCourseSeenTime = undefined
      }
    }

    return {
      afterAttach,
      fetchMedia: flow(fetchMedia),
      fetchTutorials: flow(fetchTutorials),
      resetActiveTutorial,
      resetSeen,
      setActiveTutorial,
      setMediaResources,
      setSeenTime,
      setTutorialStep,
      setTutorials
    }
  })

export default types.compose('TutorialResourceStore', ResourceStore, TutorialStore)
