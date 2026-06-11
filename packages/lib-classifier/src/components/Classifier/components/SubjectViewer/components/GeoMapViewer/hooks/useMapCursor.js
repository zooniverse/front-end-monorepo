import { useEffect } from 'react'

import { POINTER_MOVE_HIT_CHECK_INTERVAL_MS, POINTER_MOVE_HIT_CHECK_MIN_DELTA_PIXELS } from '../helpers/constants'
import getCursorFromState, { isPointerOverFeature } from '../helpers/getCursorFromState'
import getPixelDistance from '../helpers/getPixelDistance'
import isLineStringFeature from '../helpers/isLineStringFeature'

export default function useMapCursor({
  map,
  layer,
  select,
  draw,
  modify,
  moveToClick,
  geoDrawingTask,
  hasGeoDrawingTask,
  activeToolType,
  isMeasureModeActive
}) {
  useEffect(() => {
    if (!map || !layer || !select || !hasGeoDrawingTask) return undefined

    let rafId = null
    let latestEvent = null
    let lastCursor = ''
    let lastHitTs = 0
    let lastHitPixel = null
    let lastHitResult = false

    function applyCursor(cursor) {
      if (lastCursor === cursor) return
      const viewport = map.getViewport()
      if (viewport) viewport.style.cursor = cursor
      lastCursor = cursor
    }

    function onPointerMove(event) {
      latestEvent = event
      if (rafId !== null) return
      rafId = requestAnimationFrame(() => {
        rafId = null
        const e = latestEvent
        if (!e) return

        if (isMeasureModeActive) {
          const target = map.getTargetElement()
          if (target) target.style.cursor = ''
          return
        }

        const now = performance.now()
        const moved = !lastHitPixel || getPixelDistance(e.pixel, lastHitPixel) >= POINTER_MOVE_HIT_CHECK_MIN_DELTA_PIXELS
        const elapsed = (now - lastHitTs) >= POINTER_MOVE_HIT_CHECK_INTERVAL_MS
        if (moved || elapsed) {
          lastHitResult = isPointerOverFeature({ map, layer, pixel: e.pixel, geoDrawingTask })
          lastHitTs = now
          lastHitPixel = [...e.pixel]
        }

        const cursor = getCursorFromState({
          map,
          layer,
          select,
          draw,
          modify,
          geoDrawingTask,
          activeToolType,
          isMeasureModeActive,
          isDraggingPoint: moveToClick?.isDragging() ?? false,
          pixel: e.pixel,
          dragging: e.dragging,
          cachedFeatureHit: lastHitResult
        })
        applyCursor(cursor)
      })
    }

    function onPointerDown(event) {
      const isDrawing = activeToolType === 'SegmentedLine' && !isMeasureModeActive
      if (!isDrawing) return
      const selected = select.getFeatures().item(0)
      if (!isLineStringFeature(selected)) return
      const coords = selected.getGeometry().getCoordinates?.() || []
      const nearVertex = coords.some((coord) => (
        getPixelDistance(event.pixel, map.getPixelFromCoordinate(coord)) <= 10
      ))
      if (nearVertex) {
        const viewport = map.getViewport()
        if (viewport) viewport.style.cursor = 'grabbing'
      }
    }

    map.on('pointermove', onPointerMove)
    map.on('pointerdown', onPointerDown)

    return () => {
      map.un('pointermove', onPointerMove)
      map.un('pointerdown', onPointerDown)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [map, layer, select, draw, modify, moveToClick, geoDrawingTask, hasGeoDrawingTask, activeToolType, isMeasureModeActive])
}
