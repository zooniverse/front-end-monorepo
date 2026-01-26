import PointerInteraction from 'ol/interaction/Pointer'
import asMSTFeature from './asMSTFeature'

function createModifyUncertaintyInteraction({
  geoDrawingTask,
  selectInteraction,
  translateInteraction,
  dragHandleTolerance = 15, // pixels
  minRadius = 10 // meters
}) {
  const state = {
    draggedFeature: null,
    isDragging: false
  }

  // Cache MST feature creation to avoid repeated creation on pointermove
  const mstFeatureCache = new WeakMap()

  function getCachedMSTFeature(olFeature) {
    if (!mstFeatureCache.has(olFeature)) {
      mstFeatureCache.set(olFeature, asMSTFeature(olFeature))
    }
    return mstFeatureCache.get(olFeature)
  }

  function distance([x1, y1], [x2, y2]) {
    const dx = x2 - x1
    const dy = y2 - y1
    return Math.sqrt(dx * dx + dy * dy)
  }

  /**
   * Check if pointer is near the uncertainty circle drag handle of any selected feature
   */
  function checkDragHandleClick(pixel, map) {
    if (!selectInteraction) return null

    const selectedFeatures = selectInteraction.getFeatures().getArray()

    for (const olFeature of selectedFeatures) {
      const mstFeature = getCachedMSTFeature(olFeature)
      if (!mstFeature) continue

      // Check if this feature has an uncertainty circle
      const radius = mstFeature.getUncertaintyRadius?.({ 
        feature: olFeature, 
        geoDrawingTask 
      })
      if (radius == null) continue

      // Get the drag handle coordinates
      const dragHandleCoordinates = mstFeature.getDragHandleCoordinates?.({ 
        feature: olFeature, 
        geoDrawingTask 
      })
      if (!dragHandleCoordinates) continue

      // Check if click is near the drag handle
      const dragHandlePixel = map.getPixelFromCoordinate(dragHandleCoordinates)
      if (distance(pixel, dragHandlePixel) < dragHandleTolerance) {
        return olFeature
      }
    }

    return null
  }

  /**
   * Handle pointer down - detect if clicking near drag handle
   */
  function handleDownEvent(event) {
    const map = this.getMap()
    if (!map) return false

    const selectedFeature = checkDragHandleClick(event.pixel, map)

    if (selectedFeature) {
      state.draggedFeature = selectedFeature
      state.isDragging = true

      // Disable Translate interaction while dragging uncertainty drag handle
      if (translateInteraction) {
        translateInteraction.setActive(false)
      }

      // Update cursor
      const viewport = map.getViewport()
      if (viewport) {
        viewport.style.cursor = 'grabbing'
      }

      // Return true to start drag sequence
      return true
    }

    return false
  }

  /**
   * Handle drag - update radius based on distance from center
   */
  function handleDragEvent(event) {
    if (!state.isDragging || !state.draggedFeature) {
      return
    }

    const map = this.getMap()
    if (!map) return

    const coordinate = map.getCoordinateFromPixel(event.pixel)
    const centerCoordinates = state.draggedFeature.getGeometry().getCoordinates()

    // Calculate new radius in meters
    const newRadius = Math.max(minRadius, distance(centerCoordinates, coordinate))

    // Update feature property
    state.draggedFeature.set('uncertainty_radius', newRadius)

    // Trigger re-render
    state.draggedFeature.changed()
  }

  /**
   * Handle pointer up - finish dragging
   */
  function handleUpEvent(event) {
    if (state.isDragging) {
      state.isDragging = false
      state.draggedFeature = null

      // Re-enable Translate interaction
      if (translateInteraction) {
        translateInteraction.setActive(true)
      }

      // Reset cursor
      const map = this.getMap()
      const viewport = map?.getViewport()
      if (viewport) {
        viewport.style.cursor = ''
      }

      // Return false to prevent the event from deselecting the feature
      return false
    }

    return true
  }

  /**
   * Handle pointer move - update cursor when hovering over drag handle
   */
  function handleMoveEvent(event) {
    const map = this.getMap()
    if (!map) return

    // Don't change cursor while dragging
    if (state.isDragging) return

    const viewport = map.getViewport()
    if (!viewport) return

    const selectedFeature = checkDragHandleClick(event.pixel, map)

    if (selectedFeature) {
      viewport.style.cursor = 'grab'
    } else {
      viewport.style.cursor = ''
    }
  }

  // Create the PointerInteraction with our handlers
  const interaction = new PointerInteraction({
    handleDownEvent,
    handleDragEvent,
    handleUpEvent,
    handleMoveEvent
  })

  return interaction
}

export default createModifyUncertaintyInteraction
