import { View } from 'ol'
import Feature from 'ol/Feature'
import { containsCoordinate, getHeight, getWidth } from 'ol/extent'
import Polygon, { fromExtent } from 'ol/geom/Polygon'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { Fill, Stroke, Style } from 'ol/style'

export const EXTENT_PADDING_FACTOR = 0.1
// The outer mask ring only needs to outrun the pan range the padded view extent allows.
export const MASK_COVERAGE_FACTOR = 50
export const MASK_FILL_COLOR = 'rgba(0, 0, 0, 0.35)'
export const MASK_STROKE_COLOR = 'rgba(255, 255, 255, 0.9)'
export const MASK_STROKE_WIDTH = 2

export function padExtent(extent, factor = EXTENT_PADDING_FACTOR) {
  const dx = getWidth(extent) * factor
  const dy = getHeight(extent) * factor
  return [extent[0] - dx, extent[1] - dy, extent[2] + dx, extent[3] + dy]
}

export function isWithinSubjectExtent(map, coordinate) {
  const extent = map?.get('subjectExtent')
  if (!extent) return true
  return containsCoordinate(extent, coordinate)
}

export function clampToSubjectExtent(map, coordinate) {
  const extent = map?.get('subjectExtent')
  if (!extent) return coordinate
  return [
    Math.min(Math.max(coordinate[0], extent[0]), extent[2]),
    Math.min(Math.max(coordinate[1], extent[1]), extent[3])
  ]
}

export function createExtentMaskLayer(extent) {
  const outerRing = fromExtent(padExtent(extent, MASK_COVERAGE_FACTOR)).getCoordinates()[0]
  const innerRing = fromExtent(extent).getCoordinates()[0]
  const mask = new Feature(new Polygon([outerRing, innerRing]))
  const layer = new VectorLayer({
    source: new VectorSource({ features: [mask], wrapX: false }),
    style: new Style({
      fill: new Fill({ color: MASK_FILL_COLOR }),
      stroke: new Stroke({ color: MASK_STROKE_COLOR, width: MASK_STROKE_WIDTH })
    })
  })
  layer.set('extentMask', true)
  return layer
}

// OL only accepts an extent constraint at View construction, so constraining swaps the view.
function createConstrainedView(map, extent) {
  const view = map.getView()
  const size = map.getSize()
  const constrained = new View({
    center: view.getCenter(),
    zoom: view.getZoom(),
    projection: view.getProjection(),
    extent,
    constrainOnlyCenter: true
  })
  if (size) {
    const fitResolution = Math.max(getWidth(extent) / size[0], getHeight(extent) / size[1])
    constrained.setMinZoom(constrained.getZoomForResolution(fitResolution))
  }
  return constrained
}

export default function constrainMapToExtent(map, extent) {
  // A lone point subject with no bbox has a zero-area extent; skip constraining.
  if (!map || !extent || getWidth(extent) <= 0 || getHeight(extent) <= 0) return

  map.set('subjectExtent', extent)
  map.setView(createConstrainedView(map, padExtent(extent)))

  const layers = map.getLayers()
  const previousMask = layers.getArray().find(layer => layer.get('extentMask'))
  if (previousMask) map.removeLayer(previousMask)
  layers.insertAt(layers.getLength() - 1, createExtentMaskLayer(extent))
}
