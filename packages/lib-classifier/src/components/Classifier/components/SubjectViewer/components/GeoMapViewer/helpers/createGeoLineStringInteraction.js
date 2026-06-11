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

function countLineStringFeaturesForTool(source, toolIndex) {
  return source.getFeatures().filter((feature) => {
    if (feature.getGeometry?.()?.getType?.() !== 'LineString') return false
    if (typeof toolIndex !== 'number') return true
    return feature.get?.('toolIndex') === toolIndex
  }).length
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
  const activeToolIndex = geoDrawingTask?.activeToolIndex
  const minPoints = activeTool?.type === 'SegmentedLine' ? activeTool.min_vertices : undefined
  const maxPoints = activeTool?.type === 'SegmentedLine' ? activeTool.max_vertices : undefined
  const featureCountMax = activeTool?.type === 'SegmentedLine' ? activeTool.max : undefined
  const effectiveMin = typeof minPoints === 'number' ? minPoints : 2

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

  // Remember the caller's desired active state so cap-recovery (delete) can re-enable Draw.
  let lastRequestedActive = false

  function syncActive() {
    const target = lastRequestedActive && !isCapped()
    if (draw.getActive() !== target) draw.setActive(target)
  }

  const sourceAddKey = source.on('addfeature', syncActive)
  const sourceRemoveKey = source.on('removefeature', syncActive)

  const drawStartKey = draw.on('drawstart', function handleDrawStart() {
    isDrawing = true
  })

  const drawEndKey = draw.on('drawend', function handleDrawEnd(event) {
    isDrawing = false

    const feature = event.feature
    if (!feature) return

    if (typeof activeToolIndex === 'number') {
      feature.set('toolIndex', activeToolIndex)
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

    // drawend fires before source.addFeature, so include the in-flight feature.
    if (typeof featureCountMax === 'number' && countLineStringFeaturesForTool(source, activeToolIndex) + 1 >= featureCountMax) {
      draw.setActive(false)
    }
  })

  const drawAbortKey = draw.on('drawabort', function handleDrawAbort() {
    isDrawing = false
  })

  function isCapped() {
    return typeof featureCountMax === 'number' && countLineStringFeaturesForTool(source, activeToolIndex) >= featureCountMax
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
      lastRequestedActive = active
      syncActive()
      if (!active) isDrawing = false
    },
    destroy() {
      if (drawStartKey) unByKey(drawStartKey)
      if (drawEndKey) unByKey(drawEndKey)
      if (drawAbortKey) unByKey(drawAbortKey)
      if (sourceAddKey) unByKey(sourceAddKey)
      if (sourceRemoveKey) unByKey(sourceRemoveKey)
      draw.setActive(false)
      isDrawing = false
      map.removeInteraction(draw)
    }
  }
}

export default createGeoLineStringInteraction
