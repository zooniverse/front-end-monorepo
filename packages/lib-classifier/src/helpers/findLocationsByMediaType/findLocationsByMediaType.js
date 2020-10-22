import validateSubjectLocations from '../validateSubjectLocations'
import { mimeTypeRegexes } from '../constants'

export default findLocationsByMediaType (locations = [], mediaType) {
  if (!mediaType) {
    if (process.browser || process.env.NODE === 'test') console.error('Cannot find subject locations by media type. No media type defined.')
    return []
  }

  if (locations?.length < 1) {
    if (process.browser || process.env.NODE === 'test') console.error('Cannot find subject locations by media type. No subject locations.')
    return []
  }

  const allowedMimeTypesByMedia = mimeTypeRegexes[mediaType]
  const validLocations = validateSubjectLocations(locations)
  return validLocations.find((location) => {
    const [mimeType] = Object.keys(location)
    return allowedMimeTypesByMedia.includes(mimeType)
  })
}