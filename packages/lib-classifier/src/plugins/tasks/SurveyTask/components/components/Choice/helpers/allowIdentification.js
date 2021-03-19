import getQuestionIds from './getQuestionIds'

export default function allowIdentification (
  answers = {},
  choiceId = '',
  task = {}
) {
  // if there are no questions, don't make them fill one in
  if (getQuestionIds(choiceId, task).length === 0) {
    return true
  }

  // if there are questions, it's fine as long as they've filled required ones in
  const answerProvided = []
  getQuestionIds(choiceId, task).map((questionId) => {
    const question = task.questions[questionId]
    if (question.required) {
      const answer = answers[questionId]
      if (answer && answer.length > 0) {
        answerProvided.push(true)
      } else {
        answerProvided.push(false)
      }
    } else {
      answerProvided.push(true)
    }
  })
  return answerProvided.every(answer => (answer === true))
}
