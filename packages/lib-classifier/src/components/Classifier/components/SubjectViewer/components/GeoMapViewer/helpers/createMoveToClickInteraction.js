import PointerInteraction from 'ol/interaction/Pointer'
import asMSTFeature from './asMSTFeature'
import getPixelDistance from './getPixelDistance'

export const MOVE_TO_CLICK_HOLD_DELAY = 250

function createMoveToClickInteraction({
  selectInteraction,
  geoDrawingTask,
  featuresLayer
}) {
  const state = {
    downPixel: null,
    downTimestamp: null,
    selectedFeature: null,
    clickedOnFeature: false,
    dragThreshold: 3, // pixels - must move less than this to be considered a "click"
    disabledSelect: false
  }

  function resetPointerState() {
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

  /**
   * Handle pointer down - record state for potential click-to-move
   */
  function handleDownEvent(event) {
    const map = this.getMap()
    if (!map || !selectInteraction || !geoDrawingTask) {
      return false
    }

    // Get currently selected features
    const selectedFeatures = selectInteraction.getFeatures().getArray()
    if (selectedFeatures.length === 0) {
      return false // No feature selected, let other interactions handle it
    }

    // Record state
    state.downPixel = event.pixel
    state.downTimestamp = Date.now()
    state.selectedFeature = selectedFeatures[0]
    state.clickedOnFeature = hasFeatureAtPixel(event.pixel, map)

    // If we clicked on the feature itself, return false to let Translate/ModifyUncertainty handle it
    if (state.clickedOnFeature) {
      return false
    }

    // If we clicked on empty space with a selected feature, return TRUE to track this interaction
    // This tells OpenLayers to call our handleUpEvent
    state.disabledSelect = true
    selectInteraction.setActive(false)
    return true
  }

  function stopDown() {
    return false
  }

  /**
   * Handle pointer up - move feature if it was a click on empty space
   */
  function handleUpEvent(event) {
    const map = this.getMap()
    
    // If we don't have required state, bail
    if (!map || !state.downPixel || !state.selectedFeature) {
      resetPointerState()
      if (state.disabledSelect) scheduleSelectReenable()
      return false
    }

    // Calculate if this was a drag or a click
    const upPixel = event.pixel
    const dragDistance = getPixelDistance(state.downPixel, upPixel)
    const wasClick = dragDistance < state.dragThreshold
    const holdDuration = Date.now() - state.downTimestamp
    const heldLongEnough = holdDuration >= MOVE_TO_CLICK_HOLD_DELAY

    // Only move feature if:
    // 1. It was a click (not a drag)
    // 2. The click was on empty space (not on the feature itself)
    // 3. The pointer was held long enough to count as a deliberate move
    if (wasClick && !state.clickedOnFeature && heldLongEnough) {
      const clickedCoordinate = map.getCoordinateFromPixel(upPixel)
      moveSelectedFeature(state.selectedFeature, clickedCoordinate)
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
    handleUpEvent,
    stopDown
  })

  return interaction
}

export default createMoveToClickInteraction
