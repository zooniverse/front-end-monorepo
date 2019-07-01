import get from 'lodash/get'

function pluckPersonData (object) {
  return {
    avatarSrc: get(object, 'fields.avatar.fields.file.url'),
    bio: get(object, 'fields.bio'),
    id: get(object, 'sys.id'),
    jobTitle: get(object, 'fields.jobTitle'),
    name: get(object, 'fields.name'),
    twitter: get(object, 'fields.twitterID')
  }
}

export default pluckPersonData
