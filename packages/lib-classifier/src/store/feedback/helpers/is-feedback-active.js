import metadataToRules from './metadata-to-rules';
import getFeedbackFromTasks from './get-feedback-from-tasks';

function getProjectFeedback(project) {
  return project &&
    project.experimental_tools &&
    project.experimental_tools.includes('general feedback');
}

function getSubjectFeedback(subject) {
  return subject &&
    metadataToRules(subject.metadata).length > 0;
}

function getWorkflowFeedback(workflow) {
  const taskFeedback = getFeedbackFromTasks(workflow.tasks);
  return Object.keys(taskFeedback).length > 0;
}

function isFeedbackActive(project, subject, workflow) {
  return Boolean(getProjectFeedback(project) &&
    getSubjectFeedback(subject) &&
    getWorkflowFeedback(workflow));
}

export default isFeedbackActive;
