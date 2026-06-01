import { isPixelNearDragHandle } from '@plugins/tasks/experimental/geoDrawing/features/models/Point/dragHandle'

import asMSTFeature from './asMSTFeature'
import { FEATURE_HIT_TOLERANCE_PX } from './createGeoLineStringInteraction'
import getDrawModeCursor from './getDrawModeCursor'
import getInteractionStates from './getInteractionStates'
import getPixelDistance from './getPixelDistance'
import { isPixelNearPointCenter, POINT_CENTER_HIT_RADIUS_PIXELS, getFeaturePixelsAcrossWorldCopies } from './hitTesting'
import isLineStringFeature from './isLineStringFeature'

function getDrawCursor({ map, layer, select, draw, modify, pixel, dragging }) {
  const selectedFeature = select.getFeatures().item(0)
  const coords = isLineStringFeature(selectedFeature)
    ? selectedFeature.getGeometry().getCoordinates?.() || []
    : []
  const isOnSelectedVertex = coords.some((coord) => (
    getPixelDistance(pixel, map.getPixelFromCoordinate(coord)) <= 10
  ))

  let isOnAnotherFeature = false
  map.forEachFeatureAtPixel(pixel, (feature) => {
    if (feature !== selectedFeature) {
      isOnAnotherFeature = true
      return true
    }
    return false
  }, { layerFilter: (l) => l === layer, hitTolerance: FEATURE_HIT_TOLERANCE_PX })

  return getDrawModeCursor({
    isModifying: modify?.isModifying() ?? false,
    isSketching: draw?.isDrawing() ?? false,
    isOnSelectedVertex,
    isOnAnotherFeature,
    isAtMaxLines: draw?.isCapped() ?? false,
    isDragging: dragging
  })
}

function getSelectedFeatureCursor({ map, selectedFeature, geoDrawingTask, pixel, isDraggingPoint }) {
  const mstFeature = asMSTFeature(selectedFeature)
  const coords = selectedFeature.getGeometry()?.getCoordinates?.()
  if (!mstFeature || !Array.isArray(coords)) return null

  const pixels = getFeaturePixelsAcrossWorldCopies(map, coords)
  if (pixels.some((p) => isPixelNearPointCenter({ pixel, pointPixel: p, radius: POINT_CENTER_HIT_RADIUS_PIXELS }))) {
    return isDraggingPoint ? 'grabbing' : 'grab'
  }

  const handleCoords = mstFeature.getDragHandleCoordinates?.({ feature: selectedFeature, geoDrawingTask })
  if (handleCoords) {
    const handlePixels = getFeaturePixelsAcrossWorldCopies(map, handleCoords)
    if (handlePixels.some((handlePixel) => isPixelNearDragHandle({ pixel, handlePixel, tolerance: 15 }))) {
      return 'ew-resize'
    }
  }

  const uncertaintyRadius = mstFeature.getUncertaintyRadiusPixels?.({
    feature: selectedFeature,
    geoDrawingTask,
    resolution: map.getView().getResolution()
  })
  if (typeof uncertaintyRadius === 'number' && uncertaintyRadius > 0
    && pixels.some((p) => getPixelDistance(pixel, p) <= uncertaintyRadius)) {
    return 'default'
  }

  return null
}

function getOtherCenterCursor({ map, layer, selectedFeature, pixel }) {
  let hovering = false
  layer.getSource().forEachFeature((feature) => {
    if (feature === selectedFeature || hovering) return
    const coords = feature.getGeometry()?.getCoordinates?.()
    if (!Array.isArray(coords)) return
    if (getFeaturePixelsAcrossWorldCopies(map, coords).some(
      (p) => isPixelNearPointCenter({ pixel, pointPixel: p, radius: POINT_CENTER_HIT_RADIUS_PIXELS })
    )) {
      hovering = true
    }
  })
  return hovering ? 'pointer' : 'default'
}

export function isPointerOverFeature({ map, layer, pixel, geoDrawingTask }) {
  let over = false
  layer.getSource().forEachFeature((feature) => {
    if (over) return
    const coords = feature.getGeometry()?.getCoordinates?.()
    if (!Array.isArray(coords)) return
    const pixels = getFeaturePixelsAcrossWorldCopies(map, coords)
    if (pixels.some((p) => isPixelNearPointCenter({ pixel, pointPixel: p, radius: POINT_CENTER_HIT_RADIUS_PIXELS }))) {
      over = true
      return
    }
    const mstFeature = asMSTFeature(feature)
    const radius = mstFeature?.getUncertaintyRadiusPixels?.({
      feature,
      geoDrawingTask,
      resolution: map.getView().getResolution()
    })
    if (typeof radius === 'number' && radius > 0
      && pixels.some((p) => getPixelDistance(pixel, p) <= radius)) {
      over = true
    }
  })
  return over
}

export default function getCursorFromState({
  map,
  layer,
  select,
  draw,
  modify,
  geoDrawingTask,
  activeToolType,
  isMeasureModeActive,
  isDraggingPoint,
  pixel,
  dragging,
  cachedFeatureHit
}) {
  const states = getInteractionStates({ activeToolType, isMeasureModeActive })

  if (states.measure) return ''
  if (states.lineStringDraw) {
    return getDrawCursor({ map, layer, select, draw, modify, pixel, dragging })
  }

  const selected = select.getFeatures().item(0)
  if (selected) {
    const selectedCursor = getSelectedFeatureCursor({
      map,
      selectedFeature: selected,
      geoDrawingTask,
      pixel,
      isDraggingPoint
    })
    if (selectedCursor) return selectedCursor
    return getOtherCenterCursor({ map, layer, selectedFeature: selected, pixel })
  }

  return cachedFeatureHit ? 'pointer' : 'default'
}
