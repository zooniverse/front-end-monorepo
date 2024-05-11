export default function getQuestionIds (
  choiceId = '',
  task = {}
) {
  if (task.choices && task.choices.get(choiceId)?.noQuestions) {
    return []
  }
  if (!(task.questionsMap && Object.keys(task.questionsMap).indexOf(choiceId) >= 0)) {
    return task.questionsOrder
  }
  return task.questionsMap[choiceId]
}
