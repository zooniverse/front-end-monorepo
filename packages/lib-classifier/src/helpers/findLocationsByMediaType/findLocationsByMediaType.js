import validateSubjectLocations from '../validateSubjectLocations'
import { mimeTypeRegexes } from '../constants'

export default function findLocationsByMediaType (locations = [], mediaType) {
  if (!mediaType) {
    if (process.browser || process.env.NODE === 'test') console.error('Cannot find subject locations by media type. No media type defined.')
    return []
  }

  if (!locations || locations?.length < 1) {
    if (process.browser || process.env.NODE === 'test') console.error('Cannot find subject locations by media type. No subject locations.')
    return []
  }

  if (validateSubjectLocations(locations)) {
    return locations.filter((location) => {
      const [mimeType] = Object.keys(location)

      return mimeType.includes(mediaType)
    })
  }

  return []
}