const get = require('lodash/get')

function getCommonParams (req) {
  const owner = get(req, 'params.owner')
  const project = get(req, 'params.project')
  return { owner, project }
}

module.exports = getCommonParams
