import find from 'lodash/find'
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'

import strategies from '../strategies'
import metadataToRules from './metadata-to-rules'
import getFeedbackFromTasks from './get-feedback-from-tasks'

// Create a canonical set of feedback rules for a given combination of workflow
// rules (all feedback rules available), and subject rules (those feedback
// rules that pertain to the specific subject, and any modifications / extra
// options that apply to it). It does this by matching up subject and workflow
// rules, and passing them to a createRule() function exported by the relevant
// rule strategy. This then returns the canonical rule object.
//
// For example, a rule may have a default success message, and a
// subject-specific success message. The createRule() function will set the
// successMessage property as the subject-specific message, as properties set
// in subject metadata take priority. This becomes the canonical property for
// that rule.

function generateRules (subject, workflow) {
  const subjectRules = subject ? metadataToRules(subject.metadata) : {}
  const workflowRules = workflow ? getFeedbackFromTasks(workflow.tasks) : {}
  const canonicalRules = {}

  forEach(workflowRules, (rules, taskId) => {
    const taskRules = reduce(rules, (result, workflowRule) => {
      const matchingSubjectRule = find(subjectRules, (subjectRule) => {
        if ((subjectRule.id !== null && subjectRule.id !== undefined) &&
          (workflowRule.id !== null && workflowRule.id !== undefined)) {
          return subjectRule.id.toString() === workflowRule.id.toString()
        } else {
          if (process.browser) {
            console.warn('Feedback: Subject rule id or workflow rule id is null or undefined')
          }
          return false
        }
      })

      if (matchingSubjectRule) {
        const ruleStrategy = workflowRule.strategy
        const ruleGenerator = strategies[ruleStrategy].createRule
        return result.concat([ruleGenerator(matchingSubjectRule, workflowRule)])
      } else {
        return result
      }
    }, [])

    if (taskRules.length) {
      canonicalRules[taskId] = taskRules
    }
  })

  return canonicalRules
}

export default generateRules
