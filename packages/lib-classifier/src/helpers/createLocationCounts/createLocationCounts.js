import validateMimeType from '../validateMimeType'

function createLocationCounts ({ locations }) {
  const mimeTypes = locations
    .map(location => Object.keys(location)[0])

  try {
    const images = mimeTypes
      .filter(mimeType => mimeType.startsWith('image') && validateMimeType(mimeType))
      .length

    const json = mimeTypes
      .filter(mimeType => mimeType.startsWith('application') && validateMimeType(mimeType))
      .length

    return {
      images,
      json,
      total: locations.length
    }
  } catch (error) {
    console.log(error)
    return {}
  }
}

export default createLocationCounts
