import metadataToRules from './metadata-to-rules'
import getFeedbackFromTasks from './get-feedback-from-tasks'

function getSubjectFeedback(subject) {
  return subject &&
    metadataToRules(subject.metadata).length > 0
}

function getWorkflowFeedback(workflow) {
  const taskFeedback = workflow ? getFeedbackFromTasks(workflow.tasks) : {}
  return Object.keys(taskFeedback).length > 0
}

function isFeedbackActive(subject, workflow) {
  return Boolean(getSubjectFeedback(subject) &&
    getWorkflowFeedback(workflow))
}

export default isFeedbackActive
