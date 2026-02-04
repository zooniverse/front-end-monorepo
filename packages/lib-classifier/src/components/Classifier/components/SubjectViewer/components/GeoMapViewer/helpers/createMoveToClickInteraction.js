import PointerInteraction from 'ol/interaction/Pointer'

import asMSTFeature from './asMSTFeature'

/**
 * Creates an interaction that moves a selected feature to clicked coordinates.
 *
 * When a feature is selected and the user clicks (without dragging) on empty map space,
 * the feature moves to that location. All other interactions (Translate, ModifyUncertainty, pan)
 * continue to work normally.
 *
 * @param {Object} params - Configuration object
 * @param {Select} params.selectInteraction - OpenLayers Select interaction with selected features
 * @param {GeoDrawingTask} params.geoDrawingTask - Mobx-State-Tree task model for updating feature state
 * @param {VectorLayer} params.featuresLayer - OpenLayers VectorLayer containing features
 * @returns {PointerInteraction} - Custom PointerInteraction for moving selected features
 */
function createMoveToClickInteraction({
  selectInteraction,
  geoDrawingTask,
  featuresLayer
}) {
  const state = {
    downPixel: null,
    selectedFeature: null,
    clickedOnFeature: false,
    dragThreshold: 3, // pixels - must move less than this to be considered a "click"
    disabledSelect: false
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
   * Calculate pixel distance
   */
  function pixelDistance([x1, y1], [x2, y2]) {
    const dx = x2 - x1
    const dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy)
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
      state.downPixel = null
      state.selectedFeature = null
      state.clickedOnFeature = false
      if (state.disabledSelect) scheduleSelectReenable()
      return false
    }

    // Calculate if this was a drag or a click
    const upPixel = event.pixel
    const dragDistance = pixelDistance(state.downPixel, upPixel)
    const wasClick = dragDistance < state.dragThreshold

    // Only move feature if:
    // 1. It was a click (not a drag)
    // 2. The click was on empty space (not on the feature itself)
    if (wasClick && !state.clickedOnFeature) {
      const clickedCoordinate = map.getCoordinateFromPixel(upPixel)
      const geometry = state.selectedFeature.getGeometry()

      if (geometry && typeof geometry.setCoordinates === 'function') {
        // Move the feature
        geometry.setCoordinates(clickedCoordinate)
        state.selectedFeature.changed()

        // Update MST model if available
        if (geoDrawingTask.setActiveFeatureGeometry) {
          geoDrawingTask.setActiveFeatureGeometry(geometry)
        }

        // Keep the feature selected (Select may have deselected it)
        if (selectInteraction) {
          selectInteraction.getFeatures().clear()
          selectInteraction.getFeatures().push(state.selectedFeature)

          geoDrawingTask?.setActiveOlFeature?.(state.selectedFeature)
          geoDrawingTask?.setActiveFeature?.(asMSTFeature(state.selectedFeature))

          // Dispatch select event to notify listeners
          selectInteraction.dispatchEvent({
            type: 'select',
            selected: [state.selectedFeature],
            deselected: []
          })
        }
      }
    }

    // Reset state
    state.downPixel = null
    state.selectedFeature = null
    state.clickedOnFeature = false
    if (state.disabledSelect) scheduleSelectReenable()

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
