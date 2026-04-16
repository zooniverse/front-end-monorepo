import PointerInteraction from 'ol/interaction/Pointer'
import { isPixelNearDragHandle } from '@plugins/tasks/experimental/geoDrawing/features/models/Point/dragHandle'
import asMSTFeature from './asMSTFeature'
import getPixelDistance from './getPixelDistance'
import { isPixelNearPointCenter, POINT_CENTER_HIT_RADIUS_PIXELS } from './createModifyUncertaintyInteraction'

export const MOVE_TO_CLICK_HOLD_DELAY = 250

function createMoveToClickInteraction({
  selectInteraction,
  geoDrawingTask,
  featuresLayer
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
    state.downCoordiante = null
    state.downPixel = null
    state.downTimestamp = null
    state.selectedFeature = null
    state.clickedOnFeature = false
  }

  function moveSelectedFeature(selectedFeature, clickedCoordinate) {
    const geometry = selectedFeature?.getGeometry?.()

    geometry.setCoordinates(clickedCoordinate)
    selectedFeature.changed()

    if (geoDrawingTask?.setActiveFeatureGeometry) {
      geoDrawingTask.setActiveFeatureGeometry(geometry)
    }

    if (selectInteraction) {
      selectInteraction.getFeatures().clear()
      selectInteraction.getFeatures().push(selectedFeature)

      geoDrawingTask?.setActiveOlFeature?.(selectedFeature)
      geoDrawingTask?.setActiveFeature?.(asMSTFeature(selectedFeature))

      selectInteraction.dispatchEvent({
        type: 'select',
        selected: [selectedFeature],
        deselected: []
      })
    }
  }

  /**
   * Check if there's a feature at the given pixel location
   */
  function hasFeatureAtPixel(pixel, map) {
    let hasFeature = false
    map.forEachFeatureAtPixel(
      pixel,
      () => {
        hasFeature = true
        return true // stop iteration
      },
      { layers: [featuresLayer] }
    )
    return hasFeature
  }

  function isPointerOnResizeHandle({ pixel, map, olFeature, mstFeature }) {
    const dragHandleCoordinates = mstFeature.getDragHandleCoordinates?.({
      feature: olFeature,
      geoDrawingTask
    })

    if (!dragHandleCoordinates) return false

    const dragHandlePixel = map.getPixelFromCoordinate(dragHandleCoordinates)
    return isPixelNearDragHandle({
      pixel,
      handlePixel: dragHandlePixel,
      tolerance: 15
    })
  }

  function isPointerInsideSelectedFeature({ pixel, map, olFeature }) {
    const pointCoordinates = olFeature.getGeometry()?.getCoordinates?.()
    if (!Array.isArray(pointCoordinates)) return false

    const pointPixel = map.getPixelFromCoordinate(pointCoordinates)
    return isPixelNearPointCenter({
      pixel,
      pointPixel,
      radius: POINT_CENTER_HIT_RADIUS_PIXELS
    })
  }

  function isPointerInUncertaintyCircleOnly({ pixel, map, olFeature, mstFeature }) {
    const pointCoordinates = olFeature.getGeometry()?.getCoordinates?.()
    if (!Array.isArray(pointCoordinates)) return false

    const pointPixel = map.getPixelFromCoordinate(pointCoordinates)
    if (isPixelNearPointCenter({
      pixel,
      pointPixel,
      radius: POINT_CENTER_HIT_RADIUS_PIXELS
    })) {
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
      && getPixelDistance(pixel, pointPixel) <= uncertaintyRadiusPixels
    )
  }

  function teleportFeatureTo(coordinate) {
    const geometry = state.selectedFeature.getGeometry()
    if (!geometry || typeof geometry.setCoordinates !== 'function') return

    geometry.setCoordinates(coordinate)
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

    const clickedInsideSelectedFeature = mstFeature
      ? isPointerInsideSelectedFeature({
        pixel: event.pixel,
        map,
        olFeature: state.selectedFeature
      })
      : false

    state.clickedOnFeature = clickedInsideSelectedFeature || hasFeatureAtPixel(event.pixel, map)

    if (clickedInsideSelectedFeature) {
      state.draggingFeature = true
      state.disabledSelect = true
      selectInteraction.setActive(false)
      return true
    }

    if (state.clickedOnFeature) {
      return false
    }

    state.disabledSelect = true
    selectInteraction.setActive(false)
    return true
  }

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
      geometry.setCoordinates([
        state.featureCoordinate[0] + deltaX,
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
      teleportFeatureTo(map.getCoordinateFromPixel(upPixel))
    }

    // Reset state
    resetPointerState()

    if (state.disabledSelect) {
      scheduleSelectReenable()
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
