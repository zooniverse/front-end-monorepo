function isClosed (ring) {
  const [first] = ring
  const last = ring[ring.length - 1]
  return first[0] === last[0] && first[1] === last[1]
}

function geometry (rule) {
  const ring = isClosed(rule.coordinates) ? rule.coordinates : [...rule.coordinates, rule.coordinates[0]]
  return { type: 'Polygon', coordinates: [ring] }
}

export default geometry
