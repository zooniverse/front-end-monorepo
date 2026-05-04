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

function countLineStringFeatures(source) {
  return source.getFeatures().filter((feature) => (
    feature.getGeometry?.()?.getType?.() === 'LineString'
  )).length
}

function createGeoLineStringInteraction({
  map,
  source,
  featuresLayer,
  geoDrawingTask,
  selectInteraction
}) {
  let isDrawing = false

  const activeTool = geoDrawingTask?.activeTool
  const minPoints = activeTool?.type === 'LineString' ? activeTool.min_vertices : undefined
  const maxPoints = activeTool?.type === 'LineString' ? activeTool.max_vertices : undefined
  const effectiveMin = typeof minPoints === 'number' ? minPoints : 2

  // Block clicks that land on an already-placed vertex until min_vertices is
  // reached, so double/triple-clicking can't stack duplicates. After min,
  // allow them so OL's native double-click-to-finish can still close the line.
  function isDuplicateVertexClick(event) {
    const sketch = draw.getOverlay().getSource().getFeatures()
      .find(f => f.getGeometry()?.getType() === 'LineString')
    if (!sketch) return false
    const fixed = sketch.getGeometry().getCoordinates().slice(0, -1)
    if (fixed.length >= effectiveMin) return false
    return fixed.some(coord => {
      const p = map.getPixelFromCoordinate(coord)
      return p && Math.hypot(p[0] - event.pixel[0], p[1] - event.pixel[1]) <= FEATURE_HIT_TOLERANCE_PX
    })
  }

  const featureCountMax = activeTool?.type === 'LineString' ? activeTool.max_lines : undefined

  const draw = new Draw({
    source,
    type: 'LineString',
    condition: (event) => {
      if (!primaryAction(event)) return false
      if (isDrawing) return !isDuplicateVertexClick(event)
      if (!featuresLayer) return true
      return !map.hasFeatureAtPixel(event.pixel, {
        layerFilter: (layer) => layer === featuresLayer,
        hitTolerance: FEATURE_HIT_TOLERANCE_PX
      })
    },
    style: buildSketchStyleFn({ map, featuresLayer, getIsDrawing: () => isDrawing }),
    ...(typeof minPoints === 'number' ? { minPoints } : {}),
    ...(typeof maxPoints === 'number' ? { maxPoints } : {})
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

    // OL Draw fires drawend BEFORE source.addFeature, so the new line isn't
    // counted yet. +1 accounts for it.
    if (typeof featureCountMax === 'number' && countLineStringFeatures(source) + 1 >= featureCountMax) {
      draw.setActive(false)
    }
  })

  const drawAbortKey = draw.on('drawabort', function handleDrawAbort() {
    isDrawing = false
  })

  function isCapped() {
    return typeof featureCountMax === 'number' && countLineStringFeatures(source) >= featureCountMax
  }

  return {
    isDrawing() {
      return isDrawing
    },
    isCapped,
    abortDrawing() {
      draw.abortDrawing?.()
      isDrawing = false
    },
    setActive(active) {
      if (active && isCapped()) {
        draw.setActive(false)
        return
      }
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
