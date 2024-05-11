export default function getQuestionIds (
  choiceId = '',
  task = {}
) {
  if (task.choices && task.choices.get(choiceId)?.noQuestions) {
    return []
  }
  if (!(task.questionsMap?.has(choiceId))) {
    return task.questionsOrder
  }
  return task.questionsMap.get(choiceId)
}
