import { primaryAction } from 'ol/events/condition'
import { unByKey } from 'ol/Observable'
import Draw from 'ol/interaction/Draw'
import { createEditingStyle } from 'ol/style/Style'

export const FEATURE_HIT_TOLERANCE_PX = 8

const DEFAULT_DRAW_STYLES = createEditingStyle()

export function buildSketchStyleFn({ map, featuresLayer, getIsDrawing }) {
  return function suppressSketchPointOverFeature(feature) {
    const geometry = feature?.getGeometry?.()
    const geometryType = geometry?.getType?.()
    if (!geometryType) return DEFAULT_DRAW_STYLES.Point
    if (geometryType === 'Point' && !getIsDrawing() && featuresLayer) {
      const coord = geometry.getCoordinates?.()
      if (coord) {
        const pixel = map.getPixelFromCoordinate(coord)
        if (pixel && map.hasFeatureAtPixel(pixel, {
          layerFilter: (layer) => layer === featuresLayer,
          hitTolerance: FEATURE_HIT_TOLERANCE_PX
        })) {
          return null
        }
      }
    }
    return DEFAULT_DRAW_STYLES[geometryType]
  }
}

function createGeoLineStringInteraction({
  map,
  source,
  featuresLayer,
  geoDrawingTask,
  selectInteraction
}) {
  let isDrawing = false

  const draw = new Draw({
    source,
    type: 'LineString',
    condition: (event) => {
      if (!primaryAction(event)) return false
      if (isDrawing) return true
      if (!featuresLayer) return true
      return !map.hasFeatureAtPixel(event.pixel, {
        layerFilter: (layer) => layer === featuresLayer,
        hitTolerance: FEATURE_HIT_TOLERANCE_PX
      })
    },
    style: buildSketchStyleFn({ map, featuresLayer, getIsDrawing: () => isDrawing })
  })

  map.addInteraction(draw)
  draw.setActive(false)

  const drawStartKey = draw.on('drawstart', function handleDrawStart() {
    isDrawing = true
  })

  const drawEndKey = draw.on('drawend', function handleDrawEnd(event) {
    isDrawing = false

    const feature = event.feature
    if (!feature) return

    const toolIndex = geoDrawingTask?.activeToolIndex
    if (typeof toolIndex === 'number') {
      feature.set('toolIndex', toolIndex)
    }

    if (selectInteraction) {
      Promise.resolve().then(() => {
        selectInteraction.getFeatures().clear()
        selectInteraction.getFeatures().push(feature)
        selectInteraction.dispatchEvent({
          type: 'select',
          selected: [feature],
          deselected: []
        })
      })
    }
  })

  const drawAbortKey = draw.on('drawabort', function handleDrawAbort() {
    isDrawing = false
  })

  return {
    isDrawing() {
      return isDrawing
    },
    abortDrawing() {
      draw.abortDrawing?.()
      isDrawing = false
    },
    setActive(active) {
      draw.setActive(active)
      if (!active) isDrawing = false
    },
    destroy() {
      if (drawStartKey) unByKey(drawStartKey)
      if (drawEndKey) unByKey(drawEndKey)
      if (drawAbortKey) unByKey(drawAbortKey)
      draw.setActive(false)
      isDrawing = false
      map.removeInteraction(draw)
    }
  }
}

export default createGeoLineStringInteraction
