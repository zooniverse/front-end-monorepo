import PointerInteraction from 'ol/interaction/Pointer'
import { isPixelNearDragHandle } from '@plugins/tasks/experimental/geoDrawing/features/models/Point/dragHandle'
import asMSTFeature from './asMSTFeature'
import getPixelDistance from './getPixelDistance'
import { isPixelNearPointCenter, POINT_CENTER_HIT_RADIUS_PIXELS } from './createModifyUncertaintyInteraction'

function createMoveToClickInteraction({
  selectInteraction,
  geoDrawingTask,
  featuresLayer
}) {
  const state = {
    downPixel: null,
    downCoordinate: null,
    featureCoordinate: null,
    selectedFeature: null,
    clickedOnFeature: false,
    draggingFeature: false,
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

  function isPointerInsideSelectedFeature({ pixel, map, olFeature, mstFeature }) {
    const pointCoordinates = olFeature.getGeometry()?.getCoordinates?.()
    if (!Array.isArray(pointCoordinates)) return false

    const pointPixel = map.getPixelFromCoordinate(pointCoordinates)
    if (isPixelNearPointCenter({
      pixel,
      pointPixel,
      radius: POINT_CENTER_HIT_RADIUS_PIXELS
    })) {
      return true
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

    const clickedInsideSelectedFeature = mstFeature
      ? isPointerInsideSelectedFeature({
        pixel: event.pixel,
        map,
        olFeature: state.selectedFeature,
        mstFeature
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
   * Handle pointer up - move feature if it was a click on empty space
   */
  function handleUpEvent(event) {
    const map = this.getMap()

    if (!map || !state.downPixel || !state.selectedFeature) {
      state.downPixel = null
      state.downCoordinate = null
      state.featureCoordinate = null
      state.selectedFeature = null
      state.clickedOnFeature = false
      state.draggingFeature = false
      if (state.disabledSelect) scheduleSelectReenable()
      return false
    }

    const upPixel = event.pixel
    const dragDistance = getPixelDistance(state.downPixel, upPixel)
    const wasClick = dragDistance < state.dragThreshold

    if (wasClick && !state.clickedOnFeature) {
      const clickedCoordinate = map.getCoordinateFromPixel(upPixel)
      const geometry = state.selectedFeature.getGeometry()

      if (geometry && typeof geometry.setCoordinates === 'function') {
        geometry.setCoordinates(clickedCoordinate)
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
    }

    state.downPixel = null
    state.downCoordinate = null
    state.featureCoordinate = null
    state.selectedFeature = null
    state.clickedOnFeature = false
    state.draggingFeature = false
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
    handleDragEvent,
    handleUpEvent,
    stopDown
  })

  return interaction
}

export default createMoveToClickInteraction
