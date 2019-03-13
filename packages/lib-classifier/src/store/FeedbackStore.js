import { autorun } from 'mobx'
import { addDisposer, getRoot, onAction, types } from 'mobx-state-tree'

import helpers from './feedback/helpers'
import strategies from './feedback/strategies'

const FeedbackStore = types
  .model('FeedbackStore', {
    isActive: types.optional(types.boolean, false),
    rules: types.map(types.frozen({}))
  })
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
          self.createFeedbackRules(subject)
        }
      })
      addDisposer(self, subjectDisposer)
    }

    function createClassificationObserver () {
      const classificationDisposer = autorun(() => {
        onAction(getRoot(self), (call) => {
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

    function createFeedbackRules (subject) {
      const project = getRoot(self).projects.active
      const workflow = getRoot(self).workflows.active

      self.isActive = helpers.isFeedbackActive(project, subject, workflow)

      if (self.isActive) {
        self.rules = helpers.generateRules(subject, workflow)
      }
    }

    function update (annotation) {
      const { task, value } = annotation
      const taskRules = self.rules.get(task)
      const updatedTaskRules = taskRules.map(rule => {
        const ruleReducer = strategies[rule.strategy].reducer
        return ruleReducer(rule, value)
      })
      self.rules.set(task, updatedTaskRules)
      console.log('updated feedback rules: ', self.rules.toJSON())
    }

    function reset () {
      self.isActive = false
      self.rules = {}
    }

    return {
      afterAttach,
      createFeedbackRules,
      update,
      reset
    }
  })

export default FeedbackStore
