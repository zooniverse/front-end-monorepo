import get from 'lodash/get'

function pluckProjectData (object) {
  return {
    categories: get(object, 'fields.categories')
      .map(category => get(category, 'sys.id')),
    id: get(object, 'sys.id'),
    panoptesId: get(object, 'fields.projectId'),
    publications: [],
    slug: get(object, 'fields.slug'),
    title: get(object, 'fields.title')
  }
}

export default pluckProjectData
