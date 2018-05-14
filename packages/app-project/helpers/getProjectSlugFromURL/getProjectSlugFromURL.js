function getProjectSlugFromURL (asPath) {
  const parts = asPath.split('/').filter(Boolean)
  return `${parts[1]}/${parts[2]}`
}

export default getProjectSlugFromURL
