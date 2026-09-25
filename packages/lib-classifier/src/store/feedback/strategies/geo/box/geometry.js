import boxCornersLonLat from './box-corners-lon-lat'

function geometry (rule) {
  const ring = boxCornersLonLat(rule)
  return { type: 'Polygon', coordinates: [[...ring, ring[0]]] }
}

export default geometry
