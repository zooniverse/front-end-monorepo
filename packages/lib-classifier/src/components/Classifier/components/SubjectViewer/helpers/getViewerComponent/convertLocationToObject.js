function convertLocationToObject (location) {
  const mimeTypeParts = Object.keys(location)[0].split('/')
  return {
    mimeType: mimeTypeParts[0],
    mimeSubType: mimeTypeParts[1],
    url: location[Object.keys(location)[0]]
  }
}

export default convertLocationToObject
