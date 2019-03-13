function singleAnswerQuestionReducer (rule, answer) {
  const answerId = (answer > -1) && (answer !== null) ? answer : -1
  const result = rule.answer === answerId.toString()
  return Object.assign({}, rule, {
    success: result
  })
}

export default singleAnswerQuestionReducer
