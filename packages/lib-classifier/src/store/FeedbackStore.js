import { autorun } from 'mobx'
import { addDisposer, getRoot, types } from 'mobx-state-tree'

import * as helpers from './feedback/helpers'
import strategies from './feedback/strategies'

const FeedbackStore = types
  .model('FeedbackStore', {
    isActive: types.optional(types.boolean, false),
    rules: types.map(types.frozen({}))
  })
  .actions(self => {
    function afterAttach () {
      createSubjectObserver()
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
      self.rules[task] = updatedTaskRules
      console.log('updated feedback rules: ', self.rules.get(task))
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
