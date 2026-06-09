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
  map,
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

  // Avoid rebuilding MST features on every pointermove.
  const mstFeatureCache = new WeakMap()

  function getCachedMSTFeature(olFeature) {
    if (!mstFeatureCache.has(olFeature)) {
      mstFeatureCache.set(olFeature, asMSTFeature(olFeature))
    }
    return mstFeatureCache.get(olFeature)
  }

  function checkDragHandleClick(pixel, map) {
    if (!selectInteraction) return null

    const selectedFeatures = selectInteraction.getFeatures().getArray()

    for (const olFeature of selectedFeatures) {
      const mstFeature = getCachedMSTFeature(olFeature)
      if (!mstFeature) continue

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

      const dragHandleCoordinates = mstFeature.getDragHandleCoordinates?.({
        feature: olFeature,
        geoDrawingTask
      })
      if (!dragHandleCoordinates) continue

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

  function handleDownEvent(event) {
    const map = this.getMap()
    if (!map) return false

    const selectedFeature = checkDragHandleClick(event.pixel, map)

    if (selectedFeature) {
      state.draggedFeature = selectedFeature
      state.isDragging = true

      if (translateInteraction) {
        translateInteraction.setActive(false)
      }

      const viewport = map.getViewport()
      if (viewport) {
        viewport.style.cursor = 'ew-resize'
      }

      return true
    }

    return false
  }

  function handleDragEvent(event) {
    if (!state.isDragging || !state.draggedFeature) {
      return
    }

    const map = this.getMap()
    if (!map) return

    const coordinate = map.getCoordinateFromPixel(event.pixel)
    const centerCoordinates = state.draggedFeature.getGeometry().getCoordinates()

    // Wrap drag X to nearest world copy of the center so cross-dateline radii stay short.
    const extent = map.getView().getProjection().getExtent()
    const worldWidth = extent ? extent[2] - extent[0] : 0
    let dragX = coordinate[0]
    if (worldWidth > 0) {
      const rawDelta = coordinate[0] - centerCoordinates[0]
      const wrappedDelta = ((rawDelta + worldWidth / 2) % worldWidth + worldWidth) % worldWidth - worldWidth / 2
      dragX = centerCoordinates[0] + wrappedDelta
    }
    const normalizedCoordinate = [dragX, coordinate[1]]

    const newRadius = Math.round(
      Math.max(minRadius, getPixelDistance(centerCoordinates, normalizedCoordinate))
    )

    // Route through GeoDrawingTask so MST activeFeature + slider stay in sync.
    if (geoDrawingTask?.setActiveFeatureUncertaintyRadius) {
      geoDrawingTask.setActiveFeatureUncertaintyRadius(newRadius)
    } else {
      state.draggedFeature.set('uncertainty_radius', newRadius)
      state.draggedFeature.changed()
    }
  }

  function handleUpEvent(event) {
    if (state.isDragging) {
      state.isDragging = false
      state.draggedFeature = null

      if (translateInteraction) {
        translateInteraction.setActive(true)
      }

      const map = this.getMap()
      const viewport = map?.getViewport()
      if (viewport) {
        viewport.style.cursor = ''
      }

      // Returning false prevents OL from deselecting the feature on up.
      return false
    }

    return true
  }

  const interaction = new PointerInteraction({
    handleDownEvent,
    handleDragEvent,
    handleUpEvent
  })

  if (map) map.addInteraction(interaction)

  return {
    setActive(active) {
      interaction.setActive(active)
    },
    destroy() {
      if (map) map.removeInteraction(interaction)
    }
  }
}

export default createModifyUncertaintyInteraction
