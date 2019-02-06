import { autorun } from 'mobx'
import { addDisposer, getRoot, types } from 'mobx-state-tree'
import _ from 'lodash'

import * as helpers from '../features/feedback/shared/helpers'
import strategies from '../features/feedback/shared/strategies'

const FeedbackStore = types
  .model('FeedbackStore', {
    active: types.optional(types.boolean, false),
    rules: types.frozen({})
  })
  .views(self => ({
    get currentRules () {
      if (self.active) {
        return self.rules
      }
      return null
    }
  }))
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

      self.active = helpers.isFeedbackActive(project, subject, workflow)

      if (self.active) {
        self.rules = helpers.generateRules(subject, workflow)
      }
    }

    function update (annotation) {
      const newRules = _.clone(self.rules)
      const { task, value } = annotation
      const taskRules = newRules[task]
      const newTaskRules = taskRules.map(rule => {
        const ruleReducer = strategies[rule.strategy].reducer
        return ruleReducer(rule, value)
      })
      newRules[task] = newTaskRules
      self.rules = newRules
    }

    function reset () {
      self.active = false
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
