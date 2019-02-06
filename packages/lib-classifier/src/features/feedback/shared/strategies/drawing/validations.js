function validateDefaultTolerance (formState) {
  if (!formState.defaultTolerance) {
    return false
  } else {
    const re = /^\d+(?:\.\d+)?$/
    return typeof formState.defaultTolerance === 'string' &&
      re.test(formState.defaultTolerance)
  }
}

export default [
  validateDefaultTolerance
]
