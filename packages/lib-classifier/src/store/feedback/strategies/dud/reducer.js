import assign from 'lodash/assign'

// Determines whether the annotation array is empty or not.
function dudReducer (rule, annotations) {
  const result = annotations.length === 0

  return assign(rule, {
    success: result
  })
}

export default dudReducer
