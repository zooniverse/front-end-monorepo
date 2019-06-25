import get from 'lodash/get'

function pluckContentType (object) {
  return get(object, 'sys.contentType.sys.id')
}

export default pluckContentType
