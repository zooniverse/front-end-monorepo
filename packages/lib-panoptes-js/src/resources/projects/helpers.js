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

const endpoint = '/projects'

module.exports = { getProjectSlugFromURL, endpoint }
