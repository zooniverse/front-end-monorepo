export default function getFilteredChoiceIds (filters, task) {
  return task.choicesOrder.map((choiceId) => {
    const choice = task.choices[choiceId]
    let rejected = false
    Object.keys(filters).map((characteristicId) => {
      const valueId = filters[characteristicId]
      const characteristic = choice.characteristics[characteristicId] || []
      if (characteristic.indexOf(valueId) === -1) {
        rejected = true
      }
    })
    if (rejected) {
      return null
    } else {
      return choiceId
    }
  }).filter(Boolean)
}
