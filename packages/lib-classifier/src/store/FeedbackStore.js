import { autorun } from 'mobx'
import { addDisposer, addMiddleware, getRoot, onAction, types } from 'mobx-state-tree'
import { flatten } from 'lodash'

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
        }).filter(Boolean)
    }
  }))
  .actions(self => {
    function afterAttach () {
      createClassificationObserver()
      createSubjectMiddleware()
      createSubjectObserver()
    }

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onAction(getRoot(self).classifications, (call) => {
          if (call.name === 'completeClassification') {
            const annotations = getRoot(self).classifications.currentAnnotations
            annotations.forEach(annotation => self.update(annotation))
          }
        })
      })
      addDisposer(self, classificationDisposer)
    }

    function createSubjectMiddleware () {
      const subjectMiddleware = autorun(() => {
        addMiddleware(getRoot(self).subjects, (call, next, abort) => {
          if (call.name === 'advance' && self.isActive && self.messages.length && !self.showModal) {
            self.showFeedback()
            return abort()
          }
          next(call)
        })
      })
      addDisposer(self, subjectMiddleware)
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
      getRoot(self).subjects.advance()
      self.showModal = false
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
      self.showModal = false
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
