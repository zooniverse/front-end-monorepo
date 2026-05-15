import PointerInteraction from 'ol/interaction/Pointer'
import { get as getProjection } from 'ol/proj'
import { isPixelNearDragHandle } from '@plugins/tasks/experimental/geoDrawing/features/models/Point/dragHandle'
import asMSTFeature from './asMSTFeature'
import getPixelDistance from './getPixelDistance'
import { isPixelNearPointCenter, POINT_CENTER_HIT_RADIUS_PIXELS, getFeaturePixelsAcrossWorldCopies } from './hitTesting'

export const MOVE_TO_CLICK_HOLD_DELAY = 250

/**
 * Wrap an X coordinate back into the projection's world extent so that features
 * dragged past the dateline remain visible and renderable by OpenLayers.
 * Derives the extent from the projection's own definition, so it works correctly
 * for any projection that declares a world extent (e.g. EPSG:3857, EPSG:4326).
 * Returns x unchanged if the projection has no defined world extent.
 */
function normalizeCoordinateToWorld(x, projectionCode) {
  const proj = getProjection(projectionCode)
  const extent = proj?.getExtent()
  if (!extent) return x
  const minX = extent[0]
  const worldWidth = extent[2] - extent[0]
  return ((((x - minX) % worldWidth) + worldWidth) % worldWidth) + minX
}

function createMoveToClickInteraction({
  selectInteraction,
  geoDrawingTask,
  featuresLayer,
  onDragStart = undefined,
  onDragEnd = undefined
}) {
  const state = {
    downCoordinate: null,
    downPixel: null,
    downTimestamp: null,
    featureCoordinate: null,
    selectedFeature: null,
    clickedOnFeature: false,
    clickedInUncertaintyCircle: false,
    draggingFeature: false,
    dragThreshold: 3, // pixels - must move less than this to be considered a "click"
    disabledSelect: false
  }

  function resetPointerState() {
    state.downCoordinate = null
    state.downPixel = null
    state.downTimestamp = null
    state.draggingFeature = false
    state.selectedFeature = null
    state.clickedOnFeature = false
    state.clickedInUncertaintyCircle = false
  }

  function isPointerOnResizeHandle({ pixel, map, olFeature, mstFeature }) {
    const uncertaintyRadiusPixels = mstFeature.getUncertaintyRadiusPixels?.({
      feature: olFeature,
      geoDrawingTask,
      resolution: map.getView().getResolution()
    })

    if (!(typeof uncertaintyRadiusPixels === 'number' && uncertaintyRadiusPixels > 0)) {
      return false
    }

    const dragHandleCoordinates = mstFeature.getDragHandleCoordinates?.({
      feature: olFeature,
      geoDrawingTask
    })

    if (!dragHandleCoordinates) return false

    return getFeaturePixelsAcrossWorldCopies(map, dragHandleCoordinates).some(
      handlePixel => isPixelNearDragHandle({ pixel, handlePixel, tolerance: 15 })
    )
  }

  function isPointerInsideSelectedFeature({ pixel, map, olFeature }) {
    const pointCoordinates = olFeature.getGeometry()?.getCoordinates?.()
    if (!Array.isArray(pointCoordinates)) return false

    return getFeaturePixelsAcrossWorldCopies(map, pointCoordinates).some(
      pointPixel => isPixelNearPointCenter({ pixel, pointPixel, radius: POINT_CENTER_HIT_RADIUS_PIXELS })
    )
  }

  function isPointerInUncertaintyCircleOnly({ pixel, map, olFeature, mstFeature }) {
    const pointCoordinates = olFeature.getGeometry()?.getCoordinates?.()
    if (!Array.isArray(pointCoordinates)) return false

    const pointPixels = getFeaturePixelsAcrossWorldCopies(map, pointCoordinates)

    if (pointPixels.some(pointPixel => isPixelNearPointCenter({ pixel, pointPixel, radius: POINT_CENTER_HIT_RADIUS_PIXELS }))) {
      return false
    }

    const uncertaintyRadiusPixels = mstFeature.getUncertaintyRadiusPixels?.({
      feature: olFeature,
      geoDrawingTask,
      resolution: map.getView().getResolution()
    })

    return (
      typeof uncertaintyRadiusPixels === 'number'
      && uncertaintyRadiusPixels > 0
      && pointPixels.some(pointPixel => getPixelDistance(pixel, pointPixel) <= uncertaintyRadiusPixels)
    )
  }

  function teleportFeatureTo(coordinate, projectionCode) {
    const geometry = state.selectedFeature.getGeometry()
    if (!geometry || typeof geometry.setCoordinates !== 'function') return

    const wrappedCoordinate = [normalizeCoordinateToWorld(coordinate[0], projectionCode), coordinate[1]]
    geometry.setCoordinates(wrappedCoordinate)
    state.selectedFeature.changed()

    if (geoDrawingTask.setActiveFeatureGeometry) {
      geoDrawingTask.setActiveFeatureGeometry(geometry)
    }

    if (selectInteraction) {
      selectInteraction.getFeatures().clear()
      selectInteraction.getFeatures().push(state.selectedFeature)

      geoDrawingTask?.setActiveOlFeature?.(state.selectedFeature)
      geoDrawingTask?.setActiveFeature?.(asMSTFeature(state.selectedFeature))

      selectInteraction.dispatchEvent({
        type: 'select',
        selected: [state.selectedFeature],
        deselected: []
      })
    }
  }

  /**
   * Handle pointer down - record state for potential click-to-move
   */
  function handleDownEvent(event) {
    const map = this.getMap()
    if (!map || !selectInteraction || !geoDrawingTask) {
      return false
    }

    const selectedFeatures = selectInteraction.getFeatures().getArray()
    if (selectedFeatures.length === 0) {
      return false
    }

    state.downPixel = event.pixel
    state.downCoordinate = map.getCoordinateFromPixel(event.pixel)
    state.downTimestamp = Date.now()
    state.selectedFeature = selectedFeatures[0]
    state.featureCoordinate = state.selectedFeature.getGeometry()?.getCoordinates?.()
    state.draggingFeature = false

    const mstFeature = asMSTFeature(state.selectedFeature)
    const clickedInsideSelectedFeature = mstFeature
      ? isPointerInsideSelectedFeature({
        pixel: event.pixel,
        map,
        olFeature: state.selectedFeature
      })
      : false

    state.clickedOnFeature = clickedInsideSelectedFeature

    // Prioritize center-point dragging over uncertainty-handle checks.
    // At far zoom, tiny uncertainty circles can place the handle near center.
    if (clickedInsideSelectedFeature) {
      state.draggingFeature = true
      state.disabledSelect = true
      selectInteraction.setActive(false)
      onDragStart?.()
      return true
    }

    const clickedOnResizeHandle = mstFeature
      ? isPointerOnResizeHandle({
        pixel: event.pixel,
        map,
        olFeature: state.selectedFeature,
        mstFeature
      })
      : false

    if (clickedOnResizeHandle) {
      state.clickedOnFeature = true
      return false
    }

    const clickedInUncertaintyCircleOnly = mstFeature
      ? isPointerInUncertaintyCircleOnly({
        pixel: event.pixel,
        map,
        olFeature: state.selectedFeature,
        mstFeature
      })
      : false

    if (clickedInUncertaintyCircleOnly) {
      // Capture the event so we can detect a click (no drag) vs a drag (map pan).
      // Setting clickedOnFeature=true prevents the empty-space teleport path in handleUpEvent.
      // draggingFeature stays false so stopDown() returns false, letting DragPan handle drags.
      state.clickedOnFeature = true
      state.clickedInUncertaintyCircle = true
      state.disabledSelect = true
      selectInteraction.setActive(false)
      return true
    }

    // If clicking on a different feature's center point, let Select handle it (it will select that feature)
    let clickedOtherFeatureCenter = false
    featuresLayer.getSource().forEachFeature((feature) => {
      if (feature === state.selectedFeature || clickedOtherFeatureCenter) return
      const coords = feature.getGeometry()?.getCoordinates?.()
      if (!Array.isArray(coords)) return
      if (getFeaturePixelsAcrossWorldCopies(map, coords).some(
        featurePixel => isPixelNearPointCenter({ pixel: event.pixel, pointPixel: featurePixel, radius: POINT_CENTER_HIT_RADIUS_PIXELS })
      )) {
        clickedOtherFeatureCenter = true
      }
    })

    if (clickedOtherFeatureCenter) {
      return false
    }

    state.disabledSelect = true
    selectInteraction.setActive(false)
    return true
  }

  /** 
   * In the OpenLayers PointerInteraction, stopDown determines if the down event is propagated to other interactions.
   * We return true to stop down events from propagating to DragPan.
   * We return false to allow DragPan to handle the event, which lets the user drag the map.
   */
  function stopDown() {
    return state.draggingFeature
  }

  function handleDragEvent(event) {
    const map = this.getMap()

    if (!map || !state.draggingFeature || !state.selectedFeature || !state.downCoordinate || !state.featureCoordinate) {
      return
    }

    const currentCoordinate = map.getCoordinateFromPixel(event.pixel)
    const deltaX = currentCoordinate[0] - state.downCoordinate[0]
    const deltaY = currentCoordinate[1] - state.downCoordinate[1]
    const geometry = state.selectedFeature.getGeometry()

    if (geometry && typeof geometry.setCoordinates === 'function') {
      const projectionCode = map.getView().getProjection().getCode()
      geometry.setCoordinates([
        normalizeCoordinateToWorld(state.featureCoordinate[0] + deltaX, projectionCode),
        state.featureCoordinate[1] + deltaY
      ])
      state.selectedFeature.changed()

      if (geoDrawingTask.setActiveFeatureGeometry) {
        geoDrawingTask.setActiveFeatureGeometry(geometry)
      }
    }
  }

  /**
   * Handle pointer up - teleport feature on click within uncertainty circle or empty space;
   * move feature if dragged from center point.
   */
  function handleUpEvent(event) {
    const map = this.getMap()

    if (!map || !state.downPixel || !state.selectedFeature) {
      resetPointerState()
      if (state.disabledSelect) scheduleSelectReenable()
      return false
    }

    const upPixel = event.pixel
    const dragDistance = getPixelDistance(state.downPixel, upPixel)
    const wasClick = dragDistance < state.dragThreshold
    const holdDuration = Date.now() - state.downTimestamp
    const heldLongEnough = holdDuration >= MOVE_TO_CLICK_HOLD_DELAY

    if (wasClick && (state.clickedInUncertaintyCircle || !state.clickedOnFeature) && heldLongEnough) {
      teleportFeatureTo(map.getCoordinateFromPixel(upPixel), map.getView().getProjection().getCode())
    }

    const wasDragging = state.draggingFeature

    // Reset state
    resetPointerState()

    if (state.disabledSelect) {
      scheduleSelectReenable()
    }

    if (wasDragging) {
      onDragEnd?.()
    }

    return false
  }

  function scheduleSelectReenable() {
    if (!selectInteraction) return
    const interaction = selectInteraction
    state.disabledSelect = false
    setTimeout(() => {
      interaction.setActive(true)
    }, 0)
  }

  // Create and return the interaction
  const interaction = new PointerInteraction({
    handleDownEvent,
    handleDragEvent,
    handleUpEvent,
    stopDown
  })

  return interaction
}

export default createMoveToClickInteraction
