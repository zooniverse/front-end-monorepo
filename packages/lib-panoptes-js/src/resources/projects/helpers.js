const URL = require('url-parse')

function getProjectSlugFromURL (urlArg) {
  const parsed = new URL(urlArg)

  const [projectPath, owner, project] = parsed.pathname.split('/')
    .filter(Boolean)

  if (projectPath === 'projects' && owner && project) {
    return `${owner}/${project}`
  } else {
    throw new Error(`Couldn't match a slug from ${urlArg}`)
  }
}

function handleError (error) {
  if (console && process.env.NODE_ENV !== 'test') console.error(error)
  return Promise.reject(error)
}

const endpoint = '/projects'

module.exports = { getProjectSlugFromURL, handleError, endpoint }
