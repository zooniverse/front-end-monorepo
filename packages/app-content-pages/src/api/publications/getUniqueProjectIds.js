import get from 'lodash/get'

function getUniqueProjectIds(publications) {
  const allProjectIds = publications.reduce((acc, publication) => {
    const newPids = publication.fields.projects.map(pluckId)
    return acc.concat(newPids)
  }, [])
  const filteredProjectIds = allProjectIds.filter(v => v)
  return [...new Set(filteredProjectIds)]
}

function pluckId(project) {
  return get(project, 'fields.projectId')
}

export default getUniqueProjectIds
