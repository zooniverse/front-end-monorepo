function getProjectSlugFromURL(urlArg) {
  let parsed

  if (urlArg.startsWith('http')) {
    parsed = new URL(urlArg)
  } else {
    const path = urlArg.startsWith('/') ? urlArg : `/${urlArg}`
    parsed = new URL(`https://www.zooniverse.org${path}`)
  }

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
