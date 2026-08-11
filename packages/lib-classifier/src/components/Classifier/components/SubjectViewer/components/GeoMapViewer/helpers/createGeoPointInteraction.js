import { primaryAction } from 'ol/events/condition'
import { unByKey } from 'ol/Observable'
import Draw from 'ol/interaction/Draw'
import { createEditingStyle } from 'ol/style/Style'

import { FEATURE_HIT_TOLERANCE_PX } from './createGeoLineStringInteraction'
import { isWithinSubjectExtent } from './extentConstraint'
import isPointFeature from './isPointFeature'

// Subject-provided points carry no toolIndex; they occupy capacity until deleted.
function countPointFeaturesForTool(source, toolIndex) {
  return source.getFeatures().filter((feature) => {
    if (!isPointFeature(feature)) return false
    const featureToolIndex = feature.get?.('toolIndex')
    return featureToolIndex === toolIndex || typeof featureToolIndex !== 'number'
  }).length
}

export function createSketchStyle({ map }) {
  const editingStyles = createEditingStyle()
  return (feature) => {
    const geometry = feature.getGeometry()
    if (!geometry) return null
    if (geometry.getType() === 'Point' && !isWithinSubjectExtent(map, geometry.getCoordinates())) {
      return null
    }
    return editingStyles[geometry.getType()]
  }
}

export function createDrawCondition({ map, featuresLayer }) {
  return (event) => {
    if (!primaryAction(event)) return false
    if (!isWithinSubjectExtent(map, event.coordinate)) return false
    if (!featuresLayer) return true
    return !map.hasFeatureAtPixel(event.pixel, {
      layerFilter: (layer) => layer === featuresLayer,
      hitTolerance: FEATURE_HIT_TOLERANCE_PX
    })
  }
}

function createGeoPointInteraction({
  map,
  source,
  featuresLayer,
  geoDrawingTask,
  selectInteraction
}) {
  const activeTool = geoDrawingTask?.activeTool
  const activeToolIndex = geoDrawingTask?.activeToolIndex
  const featureCountMax = activeTool?.type === 'Point' ? activeTool.max : 0

  const draw = new Draw({
    source,
    type: 'Point',
    condition: createDrawCondition({ map, featuresLayer }),
    style: createSketchStyle({ map })
  })

  map.addInteraction(draw)
  draw.setActive(false)

  // Remember the caller's desired active state so cap-recovery (delete) can re-enable Draw.
  let lastRequestedActive = false

  function isCapped() {
    if (featureCountMax <= 0) return true
    return countPointFeaturesForTool(source, activeToolIndex) >= featureCountMax
  }

  function syncActive() {
    const target = lastRequestedActive && !isCapped()
    if (draw.getActive() !== target) draw.setActive(target)
  }

  const sourceAddKey = source.on('addfeature', syncActive)
  const sourceRemoveKey = source.on('removefeature', syncActive)

  const drawEndKey = draw.on('drawend', (event) => {
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
    if (countPointFeaturesForTool(source, activeToolIndex) + 1 >= featureCountMax) {
      draw.setActive(false)
    }
  })

  return {
    isCapped,
    setActive(active) {
      lastRequestedActive = active
      syncActive()
    },
    destroy() {
      unByKey(drawEndKey)
      unByKey(sourceAddKey)
      unByKey(sourceRemoveKey)
      draw.setActive(false)
      map.removeInteraction(draw)
    }
  }
}

export default createGeoPointInteraction
