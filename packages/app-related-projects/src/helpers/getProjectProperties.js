function getProjectProperties (project) {
  const { id, tags, slug } = project
  return {
    id,
    tags: tags.map(cleanTag),
    slug
  }
}

module.exports = getProjectProperties

function cleanTag (tag) {
  return tag
    .toLowerCase()
    .trim()
}
