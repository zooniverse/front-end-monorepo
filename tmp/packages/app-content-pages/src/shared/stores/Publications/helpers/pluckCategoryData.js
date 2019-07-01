import get from 'lodash/get'

function pluckCategoryData (object) {
  return {
    id: get(object, 'sys.id'),
    projects: [],
    title: get(object, 'fields.title'),
    slug: get(object, 'fields.slug')
  }
}

export default pluckCategoryData
