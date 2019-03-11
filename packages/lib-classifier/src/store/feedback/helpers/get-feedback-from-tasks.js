import _ from 'lodash';

// Filters a workflow's tasks object to an object of `taskId: [feedback rules]` pairs
function getFeedbackFromTasks(tasks) {
  return _.reduce(tasks, (result, task, taskId) => {
    if (_.get(task, 'feedback.enabled', false) &&
      _.get(task, 'feedback.rules', []).length > 0) {
      return _.assign({}, result, {
        [taskId]: task.feedback.rules
      });
    } else {
      return result;
    }
  }, {});
}

export default getFeedbackFromTasks;
