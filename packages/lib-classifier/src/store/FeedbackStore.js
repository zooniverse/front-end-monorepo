import { autorun } from 'mobx'
import { addDisposer, addMiddleware, getRoot, isValidReference, tryReference, types } from 'mobx-state-tree'
import { flatten } from 'lodash'

import helpers from './feedback/helpers'
import strategies from './feedback/strategies'

const FeedbackStore = types
  .model('FeedbackStore', {
    rules: types.map(types.frozen({})),
    showModal: types.optional(types.boolean, false)
  })
  .volatile(self => ({
    onHide: () => true
  }))
  .views(self => ({
    get applicableRules () {
      return flatten(Array.from(self.rules.values()))
        .filter(rule => (rule.success && rule.successEnabled) || (!rule.success && rule.failureEnabled))
    },
    get hideSubjectViewer () {
      return flatten(Array.from(self.rules.values()))
        .some(rule => rule.hideSubjectViewer)
    },
    get isActive () {
      const { projects = {}, subjects = {}, workflows = {} } = getRoot(self)
      const validProject = isValidReference(() => projects.active) && projects.active
      const validWorkflow = isValidReference(() => workflows.active) && workflows.active
      const validSubject = isValidReference(() => subjects.active) && subjects.active
      return helpers.isFeedbackActive(validProject, validSubject, validWorkflow)
    },
    // This is a workaround for https://github.com/zooniverse/front-end-monorepo/issues/1112
    // (feedback incorrectly being active when there are no rules)
    get isValid () {
      return self.isActive && self.rules && self.rules.size > 0
    },
    get messages () {
      return self.applicableRules
        .map(rule => rule.success ? rule.successMessage : rule.failureMessage)
    },
    get shouldShowFeedback() {
      return self.isActive && self.messages.length && !self.showModal
    }
  }))
  .actions(self => {
    function _subjectsMiddleware(call, next, abort) {
      if (call.name === 'advance') {
        _onSubjectAdvance(call, next, abort)
      } else {
        next(call)
      }
    }

    function _onSubjectAdvance(call, next, abort) {
      if (self.shouldShowFeedback) {
        if (process.browser) {
          console.log('Aborting subject advance and showing feedback')
        }
        abort()
        self.showFeedback()
      } else {
        next(call)
      }
    }

    function _createSubjectMiddleware() {
      const subjects = getRoot(self)?.subjects
      addMiddleware(subjects, _subjectsMiddleware)
    }

    function afterAttach () {
      const subjectMiddlewareDisposer = autorun(_createSubjectMiddleware)
      addDisposer(self, subjectMiddlewareDisposer)
    }

    function onNewSubject () {
      const subject = tryReference(() => getRoot(self).subjects.active)
      if (subject) {
        self.reset()
        self.createRules(subject)
      }
    }

    function createRules (subject) {
      const validWorkflowReference = isValidReference(() => getRoot(self).workflows.active)

      if (validWorkflowReference && subject) {
        const workflow = getRoot(self).workflows.active

        if (self.isActive) {
          self.rules = helpers.generateRules(subject, workflow)
        }
      } else {
        if (process.browser) {
          console.error('Cannot create feedback rules without project, workflow, and/or subject')
        }
      }
    }

    function setOnHide (onHide) {
      self.onHide = onHide
    }

    function showFeedback () {
      self.showModal = true
    }

    function hideFeedback () {
      self.onHide()
      self.showModal = false
    }

    function update (annotation) {
      if (self.isValid) {
        const { task, value } = annotation
        const taskRules = self.rules.get(task) || []
        const updatedTaskRules = taskRules.map(rule => {
          const ruleReducer = strategies[rule.strategy].reducer
          return ruleReducer(rule, value)
        })
        self.rules.set(task, updatedTaskRules)
      }
    }

    function reset () {
      self.rules.clear()
      self.showModal = false
      const onHide = getRoot(self).subjects.advance
      self.setOnHide(onHide)
    }

    return {
      // TODO: this is exported for the tests but should be private.
      _onSubjectAdvance,
      afterAttach,
      createRules,
      setOnHide,
      showFeedback,
      hideFeedback,
      onNewSubject,
      update,
      reset
    }
  })

export default FeedbackStore
