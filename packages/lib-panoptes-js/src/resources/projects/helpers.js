const URL = require('url-parse')
const { isBrowser } = require('../../helpers')

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

function getProjectSlug(slug) {
  if (!slug && (isBrowser() || process.env.NODE_ENV === 'test' && global.window)) {
    return getProjectSlugFromURL(window.location.pathname)
  } else if (slug && slug.includes('projects')) {
    return getProjectSlugFromURL(slug)
  }

  return slug
}

function handleError(error) {
  if (console && process.env.NODE_ENV !== 'test') console.error(error)
  return Promise.reject(error)
}

module.exports = { getProjectSlugFromURL, getProjectSlug, handleError }
