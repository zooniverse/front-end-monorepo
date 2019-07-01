import get from 'lodash/get'

function pluckPublicationData (object) {
  return {
    authors: get(object, 'fields.authors'),
    id: get(object, 'sys.id'),
    projects: get(object, 'fields.projects')
      .map(project => get(project, 'sys.id')),
    title: get(object, 'fields.title'),
    url: get(object, 'fields.url'),
    year: get(object, 'fields.year')
  }
}
export default pluckPublicationData
