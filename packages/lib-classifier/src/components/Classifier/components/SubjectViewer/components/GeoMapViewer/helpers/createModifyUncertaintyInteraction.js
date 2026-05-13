import PointerInteraction from 'ol/interaction/Pointer'
import { isPixelNearDragHandle } from '@plugins/tasks/experimental/geoDrawing/features/models/Point/dragHandle'
import asMSTFeature from './asMSTFeature'
import getPixelDistance from './getPixelDistance'
import { isPixelNearPointCenter, POINT_CENTER_HIT_RADIUS_PIXELS, getFeaturePixelsAcrossWorldCopies } from './hitTesting'

function shouldStartDragHandleInteraction({
  pixel,
  pointPixel,
  handlePixel,
  dragHandleTolerance = 15,
  pointRadius = POINT_CENTER_HIT_RADIUS_PIXELS
}) {
  if (isPixelNearPointCenter({ pixel, pointPixel, radius: pointRadius })) {
    return false
  }

  return isPixelNearDragHandle({
    pixel,
    handlePixel,
    tolerance: dragHandleTolerance
  })
}

function createModifyUncertaintyInteraction({
  geoDrawingTask,
  selectInteraction,
  translateInteraction,
  dragHandleTolerance = 15, // pixels
  minRadius = 0 // meters
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
      if (radius === null) continue

      const pointCoordinates = olFeature.getGeometry()?.getCoordinates?.()
      const pointPixels = Array.isArray(pointCoordinates)
        ? getFeaturePixelsAcrossWorldCopies(map, pointCoordinates)
        : []

      if (pointPixels.some(pointPixel => isPixelNearPointCenter({ pixel, pointPixel }))) {
        return null
      }

      // Get the drag handle coordinates
      const dragHandleCoordinates = mstFeature.getDragHandleCoordinates?.({
        feature: olFeature,
        geoDrawingTask
      })
      if (!dragHandleCoordinates) continue

      // Check if click is near the full resize handle across all world copies.
      const dragHandlePixels = getFeaturePixelsAcrossWorldCopies(map, dragHandleCoordinates)
      if (dragHandlePixels.some(handlePixel => shouldStartDragHandleInteraction({
        pixel,
        pointPixel: pointPixels[0] ?? null,
        handlePixel,
        dragHandleTolerance
      }))) {
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
        viewport.style.cursor = 'ew-resize'
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

    // After a cross-dateline drag, centerCoordinates is in the canonical world range but
    // getCoordinateFromPixel returns a coordinate in the world copy the user is viewing.
    // Normalize the drag coordinate to the nearest world copy of the center so that
    // getPixelDistance always computes the short (correct) distance, not the ~40M-m cross-world distance.
    const extent = map.getView().getProjection().getExtent()
    const worldWidth = extent ? extent[2] - extent[0] : 0
    let dragX = coordinate[0]
    if (worldWidth > 0) {
      const rawDelta = coordinate[0] - centerCoordinates[0]
      const wrappedDelta = ((rawDelta + worldWidth / 2) % worldWidth + worldWidth) % worldWidth - worldWidth / 2
      dragX = centerCoordinates[0] + wrappedDelta
    }
    const normalizedCoordinate = [dragX, coordinate[1]]

    // Calculate new radius in meters
    const newRadius = Math.round(
      Math.max(minRadius, getPixelDistance(centerCoordinates, normalizedCoordinate))
    )

    // Update uncertainty radius through GeoDrawingTask to keep MST activeFeature and slider in sync
    if (geoDrawingTask?.setActiveFeatureUncertaintyRadius) {
      geoDrawingTask.setActiveFeatureUncertaintyRadius(newRadius)
    } else {
      state.draggedFeature.set('uncertainty_radius', newRadius)
      state.draggedFeature.changed()
    }
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

  // Create the custom uncertainty circle PointerInteraction with handlers.
  // Cursor hover state is managed centrally by GeoMapViewer.
  const interaction = new PointerInteraction({
    handleDownEvent,
    handleDragEvent,
    handleUpEvent
  })

  return interaction
}

export default createModifyUncertaintyInteraction
