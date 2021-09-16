function surveyReducer (rule, choices = []) {
  const ruleIds = rule.choiceIds
    .split(',')
    .map(idString => idString.replace(/\W/g, '').toUpperCase())

  const chosenIds = choices.map(choiceObject => choiceObject.choice)

  let result

  if (rule.choiceIds === '' && choices.length === 0) {
    result = true
  } else {
    result = chosenIds.every(choiceId => ruleIds.indexOf(choiceId) > -1) &&
      ruleIds.every(ruleId => chosenIds.indexOf(ruleId) > -1)
  }

  return Object.assign({}, rule, {
    success: result
  })
}

export default surveyReducer
