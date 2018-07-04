function handleError (error) {
  if (console && process.env.NODE_ENV !== 'test') console.error(error)
  return Promise.reject(error)
}

function isParamTypeInvalid (param, type) {
  if (param && typeof param !== type) return true

  return false
}

const endpoint = '/tutorials'

module.exports = { endpoint, handleError, isParamTypeInvalid }