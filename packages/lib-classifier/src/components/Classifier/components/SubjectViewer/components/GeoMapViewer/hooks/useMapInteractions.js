import { useEffect, useRef, useState } from 'react'

import { UNIT_OPTION_TO_SCALE_LINE_UNITS } from '../helpers/constants'
import createGeoLineStringInteraction from '../helpers/createGeoLineStringInteraction'
import createGeoLineStringModifyInteraction from '../helpers/createGeoLineStringModifyInteraction'
import createGeoPointInteraction from '../helpers/createGeoPointInteraction'
import createMeasureInteraction from '../helpers/createMeasureInteraction'
import createModifyUncertaintyInteraction from '../helpers/createModifyUncertaintyInteraction'
import createMoveToClickInteraction from '../helpers/createMoveToClickInteraction'
import getInteractionStates from '../helpers/getInteractionStates'

export default function useMapInteractions({
  map,
  source,
  layer,
  scaleLine,
  select,
  translate,
  geoDrawingTask,
  hasGeoDrawingTask,
  isMeasureModeActive,
  setIsMeasureModeActive,
  selectedUnit,
  containerRef,
  t
}) {
  const [interactions, setInteractions] = useState({
    draw: null,
    modify: null,
    pointDraw: null,
    uncertaintyModify: null,
    moveToClick: null,
    measure: null
  })
  const activeToolType = geoDrawingTask?.activeTool?.type
  const activeToolIndex = geoDrawingTask?.activeToolIndex
  const canCreatePoints = !!geoDrawingTask?.activeTool?.canCreate
  const pointDrawRef = useRef(null)

  useEffect(() => {
    if (!map) return undefined
    const measure = createMeasureInteraction({
      map,
      messages: {
        clickToContinue: t('SubjectViewer.GeoMapViewer.MeasureInteraction.clickToContinue'),
        clickToStart: t('SubjectViewer.GeoMapViewer.MeasureInteraction.clickToStart')
      }
    })
    setInteractions((prev) => ({ ...prev, measure }))
    return () => {
      measure.destroy()
      setInteractions((prev) => ({ ...prev, measure: null }))
    }
  }, [map, t])

  // OL Draw fixes min/max/toolIndex at construction; recreate on tool switch.
  useEffect(() => {
    if (!map || !source || !layer || !select || !hasGeoDrawingTask) return undefined
    const draw = createGeoLineStringInteraction({
      map,
      source,
      featuresLayer: layer,
      geoDrawingTask,
      selectInteraction: select
    })
    setInteractions((prev) => ({ ...prev, draw }))
    return () => {
      draw.destroy()
      setInteractions((prev) => ({ ...prev, draw: null }))
    }
  }, [map, source, layer, select, geoDrawingTask, hasGeoDrawingTask, activeToolIndex])

  useEffect(() => {
    if (!map || !source || !layer || !select || !hasGeoDrawingTask) return undefined
    if (activeToolType !== 'Point' || !canCreatePoints) return undefined
    const pointDraw = createGeoPointInteraction({
      map,
      source,
      featuresLayer: layer,
      geoDrawingTask,
      selectInteraction: select
    })
    pointDrawRef.current = pointDraw
    setInteractions((prev) => ({ ...prev, pointDraw }))
    return () => {
      pointDrawRef.current = null
      pointDraw.destroy()
      setInteractions((prev) => ({ ...prev, pointDraw: null }))
    }
  }, [map, source, layer, select, geoDrawingTask, hasGeoDrawingTask, activeToolType, activeToolIndex, canCreatePoints])

  useEffect(() => {
    if (!map || !select || !translate || !layer || !hasGeoDrawingTask) return undefined

    const modify = createGeoLineStringModifyInteraction({
      map,
      selectInteraction: select,
      onModifyEnd: () => {
        const viewport = map.getViewport()
        if (viewport) viewport.style.cursor = 'grab'
      },
      getMaxVertices: () => {
        const tool = geoDrawingTask?.activeTool
        return tool?.type === 'SegmentedLine' ? tool.max_vertices : undefined
      }
    })

    const uncertaintyModify = createModifyUncertaintyInteraction({
      map,
      geoDrawingTask,
      selectInteraction: select,
      translateInteraction: translate
    })

    const moveToClick = createMoveToClickInteraction({
      map,
      selectInteraction: select,
      geoDrawingTask,
      featuresLayer: layer,
      isPointDrawBelowCap: () => {
        const pointDraw = pointDrawRef.current
        return !!pointDraw && !pointDraw.isCapped()
      }
    })

    setInteractions((prev) => ({ ...prev, modify, uncertaintyModify, moveToClick }))
    return () => {
      modify.destroy()
      uncertaintyModify.destroy()
      moveToClick.destroy()
      setInteractions((prev) => ({ ...prev, modify: null, uncertaintyModify: null, moveToClick: null }))
    }
  }, [map, select, translate, layer, geoDrawingTask, hasGeoDrawingTask])

  const { draw, modify, pointDraw, uncertaintyModify, moveToClick, measure } = interactions

  useEffect(() => {
    const states = getInteractionStates({ activeToolType, isMeasureModeActive, canCreatePoints })
    measure?.setActive(states.measure)
    draw?.setActive(states.lineStringDraw)
    modify?.setActive(states.lineStringModify)
    pointDraw?.setActive(states.pointDraw)
    select?.setActive(states.select)
    translate?.setActive(states.translate)
    uncertaintyModify?.setActive(states.modifyUncertainty)
    moveToClick?.setActive(states.moveToClick)
  }, [activeToolType, activeToolIndex, canCreatePoints, isMeasureModeActive, select, translate, draw, modify, pointDraw, uncertaintyModify, moveToClick, measure])

  useEffect(() => {
    if (!scaleLine) return
    scaleLine.setUnits(UNIT_OPTION_TO_SCALE_LINE_UNITS[selectedUnit] ?? 'metric')
    measure?.setUnit(selectedUnit)
    geoDrawingTask?.setUnit?.(selectedUnit)
  }, [scaleLine, selectedUnit, geoDrawingTask, measure])

  useEffect(() => {
    if (activeToolType === 'SegmentedLine' && isMeasureModeActive) {
      measure?.clear()
      setIsMeasureModeActive(false)
    }
  }, [activeToolType, isMeasureModeActive, measure, setIsMeasureModeActive])

  useEffect(() => {
    const container = containerRef?.current
    if (!container || !draw) return undefined
    function onKeyDown(event) {
      if (event.key !== 'Escape') return
      if (!draw.isDrawing()) return
      event.preventDefault()
      event.stopPropagation()
      draw.abortDrawing()
    }
    container.addEventListener('keydown', onKeyDown)
    return () => container.removeEventListener('keydown', onKeyDown)
  }, [containerRef, draw])

  return { draw, modify, moveToClick, pointDraw, measure }
}
