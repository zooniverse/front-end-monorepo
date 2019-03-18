import { autorun } from 'mobx'
import { addDisposer, getRoot, onAction, types } from 'mobx-state-tree'

import helpers from './feedback/helpers'
import strategies from './feedback/strategies'

const FeedbackStore = types
  .model('FeedbackStore', {
    isActive: types.optional(types.boolean, false),
    rules: types.map(types.frozen({})),
    showModal: types.optional(types.boolean, false)
  })
  .views(self => ({
    get hideSubjectViewer () {
      return flatten(Array.from(self.rules.values()))
        .some(rule => rule.hideSubjectViewer)
    },
    get messages () {
      return flatten(Array.from(self.rules.values()))
        .map(rule => {
          if (rule.success && rule.successEnabled) {
            return rule.successMessage
          } else if (!rule.success && rule.failureEnabled) {
            return rule.failureMessage
        }
      })
    }
  }))
  .actions(self => {
    function afterAttach () {
      createSubjectObserver()
      createClassificationObserver()
    }

    function createSubjectObserver () {
      const subjectDisposer = autorun(() => {
        const subject = getRoot(self).subjects.active
        if (subject) {
          self.reset()
          self.createRules(subject)
        }
      })
      addDisposer(self, subjectDisposer)
    }

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onAction(getRoot(self).classifications, (call) => {
          if (call.name === 'completeClassification') {
            const annotations = getRoot(self).classifications.currentAnnotations
            for (const value of annotations.values()) {
              self.update(value)
            }
          }
        })
      })
      addDisposer(self, classificationDisposer)
    }

    function createRules (subject) {
      const project = getRoot(self).projects.active
      const workflow = getRoot(self).workflows.active

      self.isActive = helpers.isFeedbackActive(project, subject, workflow)

      if (self.isActive) {
        self.rules = helpers.generateRules(subject, workflow)
      }
    }

    function showFeedback () {
      self.showModal = true
    }

    function hideFeedback () {
      self.showModal = false
      getRoot(self).subjects.advance()
    }

    function update (annotation) {
      const { task, value } = annotation
      const taskRules = self.rules.get(task) || []
      const updatedTaskRules = taskRules.map(rule => {
        const ruleReducer = strategies[rule.strategy].reducer
        return ruleReducer(rule, value)
      })
      self.rules.set(task, updatedTaskRules)
    }

    function reset () {
      self.isActive = false
      self.rules.clear()
    }

    return {
      afterAttach,
      createRules,
      showFeedback,
      hideFeedback,
      update,
      reset
    }
  })

export default FeedbackStore
