import { types } from 'mobx-state-tree'

const fileExtensions = {
  'application/json': ['.json'],
  'audio/mp3': ['.mp3'],
  'audio/m4a': ['.m4a'],
  'audio/mpeg': ['.mp3'],
  'image/png': ['.png'],
  'image/jpeg': ['.jpg', '.jpeg'],
  'image/gif': ['.gif'],
  'text/plain': ['.txt'], // Should we also allow .json here?
  'video/mp4': ['.mp4'],
  'video/mpeg': ['.mpeg'],
  'video/x-m4v': ['.m4v']
}

const ALLOWED_SUBJECT_TYPES = Object.keys(fileExtensions)

function validateSubjectLocation(location) {
  const [mimeType, url] = Object.entries(location)[0]
  const allowedExtensions = fileExtensions[mimeType]
  return allowedExtensions.some(extension => url.toLowerCase().endsWith(extension))
}

const SubjectLocation = types.model('SubjectLocation', {
  type: types.enumeration(['application', 'audio', 'image', 'text', 'video']),
  mimeType: types.enumeration(ALLOWED_SUBJECT_TYPES),
  url: types.string
})
.preProcessSnapshot(snapshot => {
  const entries = Object.entries(snapshot)
  const [mimeType, url] = entries[0]
  const [type] = mimeType.split('/')
  return {
    type,
    mimeType,
    url
  }
})
.postProcessSnapshot(snapshot => {
  return {
    [snapshot.mimeType]: snapshot.url
  }
})

export default types.refinement('SubjectLocation', SubjectLocation, validateSubjectLocation)
