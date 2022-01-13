import validateMimeType from '../validateMimeType'

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

export default function validateSubjectLocations (locations) {
  const areLocationsValid = locations.every((location) => {
    const [mimeType, url] = Object.entries(location)[0]
    const isMimeTypeValid = validateMimeType(mimeType)
    if (isMimeTypeValid) {
      const allowedExtensions = fileExtensions[mimeType]
      return allowedExtensions.some((extension) => {
        return url.toLowerCase().endsWith(extension)
      })
    } else {
      console.error(`${mimeType}, ${url} is invalid`)
      return false
    }
  })

  return areLocationsValid
}
