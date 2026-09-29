function geometry (rule) {
  return { type: 'Point', coordinates: [parseFloat(rule.x), parseFloat(rule.y)] }
}

export default geometry
