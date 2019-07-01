import get from 'lodash/get'
import camelCase from 'lodash/camelCase'

function pluckTeamData (object) {
  return {
    id: get(object, 'sys.id'),
    people: [],
    name: get(object, 'fields.name'),
    slug: camelCase(get(object, 'fields.name'))
  }
}

export default pluckTeamData
