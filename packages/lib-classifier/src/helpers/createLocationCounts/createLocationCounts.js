function createLocationCounts ({ locations }) {
  const types = locations
    .map(location => Object.keys(location)[0])

  const images = types
    .filter(type => type.startsWith('image'))
    .length

  return {
    images,
    total: locations.length
  }
}

export default createLocationCounts
