function getProjectSlugFromURL (url) {
  const relativeUrl = (url.startsWith('http'))
    ? url.replace(/^(?:\/\/|[^/]+)*\//, '')
    : url

  const parts = relativeUrl.split('/').filter(Boolean)
  return `${parts[1]}/${parts[2]}`
}

export default getProjectSlugFromURL
