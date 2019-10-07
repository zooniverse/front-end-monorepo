// Filters a workflow's tasks object to an object of `taskId: [feedback rules]` pairs
function getFeedbackFromTasks (tasks = {}) {
  const result = {}
  Object.entries(tasks).forEach(function getTaskRules ([taskKey, task]) {
    const defaultFeedback = { enabled: false, rules: [] }
    const { feedback } = task
    const { enabled, rules } = feedback || defaultFeedback
    const taskHasFeedback =
      enabled &&
      rules &&
      rules.length > 0

    if (taskHasFeedback) {
      result[taskKey] = task.feedback.rules
    }
  })
  return result
}

export default getFeedbackFromTasks
