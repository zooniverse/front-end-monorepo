function geometry (rule) {
  const [first] = rule.coordinates
  return Array.isArray(first[0])
    ? { type: 'MultiLineString', coordinates: rule.coordinates }
    : { type: 'LineString', coordinates: rule.coordinates }
}

export default geometry
