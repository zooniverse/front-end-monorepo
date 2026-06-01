import { useEffect, useState } from 'react'
import { singleClick } from 'ol/events/condition'
import { Select, Translate } from 'ol/interaction'
import { unByKey } from 'ol/Observable'

import asMSTFeature from '../helpers/asMSTFeature'
import { FEATURE_HIT_TOLERANCE_PX } from '../helpers/createGeoLineStringInteraction'
import { isPixelNearPointCenter, POINT_CENTER_HIT_RADIUS_PIXELS, getFeaturePixelsAcrossWorldCopies } from '../helpers/hitTesting'
import { clearSelectedFeature, selectFirstFeature } from '../helpers/mapSelection'

export default function useMapSelection({
  map,
  source,
  layer,
  geoDrawingTask,
  hasGeoDrawingTask,
  isMeasureModeActive,
  onSelectedFeatureChange
}) {
  const [interactions, setInteractions] = useState({ select: null, translate: null })
  const activeToolIndex = geoDrawingTask?.activeToolIndex

  useEffect(() => {
    if (!map || !layer || !hasGeoDrawingTask) return undefined

    const select = new Select({
      condition: singleClick,
      hitTolerance: FEATURE_HIT_TOLERANCE_PX,
      layers: [layer],
      style: null
    })

    const translate = new Translate({
      features: select.getFeatures(),
      condition: (event) => {
        const selected = select.getFeatures().getArray()[0]
        const coords = selected?.getGeometry()?.getCoordinates?.()
        if (!Array.isArray(coords)) return false
        return getFeaturePixelsAcrossWorldCopies(map, coords).some((pointPixel) => (
          isPixelNearPointCenter({ pixel: event.pixel, pointPixel, radius: POINT_CENTER_HIT_RADIUS_PIXELS })
        ))
      }
    })

    map.addInteraction(select)
    map.addInteraction(translate)
    setInteractions({ select, translate })

    return () => {
      map.removeInteraction(translate)
      map.removeInteraction(select)
      setInteractions({ select: null, translate: null })
    }
  }, [map, layer, hasGeoDrawingTask])

  const { select, translate } = interactions

  useEffect(() => {
    if (!select) return undefined

    const key = select.on('select', (event) => {
      const selected = event.selected?.[0]
      const mstFeature = selected ? asMSTFeature(selected) : null

      if (selected) {
        const featureToolIndex = selected.get?.('toolIndex')
        if (typeof featureToolIndex === 'number' && featureToolIndex !== geoDrawingTask?.activeToolIndex) {
          geoDrawingTask?.setActiveTool?.(featureToolIndex)
        }
      }

      if (onSelectedFeatureChange) {
        onSelectedFeatureChange(selected ? { mstFeature, olFeature: selected } : null)
        return
      }

      if (selected) {
        geoDrawingTask?.setActiveFeature?.(mstFeature)
        geoDrawingTask?.setActiveOlFeature?.(selected)
      } else {
        geoDrawingTask?.clearActiveFeature?.()
        geoDrawingTask?.clearActiveOlFeature?.()
      }
    })

    return () => unByKey(key)
  }, [select, geoDrawingTask, onSelectedFeatureChange])

  useEffect(() => {
    if (!select || !hasGeoDrawingTask) return
    const features = select.getFeatures()
    const current = features.item(0)
    if (!current) return
    const featureToolIndex = current.get?.('toolIndex')
    if (typeof featureToolIndex !== 'number' || featureToolIndex === activeToolIndex) return
    features.clear()
    select.dispatchEvent({ type: 'select', selected: [], deselected: [current] })
  }, [select, hasGeoDrawingTask, activeToolIndex])

  useEffect(() => {
    if (!select) return
    if (isMeasureModeActive) {
      clearSelectedFeature(select)
      const target = map?.getTargetElement()
      if (target) target.style.cursor = ''
    } else if (source) {
      selectFirstFeature(select, source.getFeatures() ?? [])
    }
  }, [isMeasureModeActive, select, map, source])

  return { select, translate }
}
