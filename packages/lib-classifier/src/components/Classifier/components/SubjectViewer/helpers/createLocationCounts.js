function createLocationCounts ({ locations }) {
  const types = locations
    .map(location => Object.keys(location)[0])

  const total = locations.length

  const images = types
    .filter(type => type.startsWith('image'))
    .length

  return {
    images,
    total
  }
}

export default createLocationCounts
