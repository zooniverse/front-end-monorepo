import { Box } from 'grommet'
import { observer } from 'mobx-react'
import { arrayOf, func, shape, string } from 'prop-types'
import { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import GeoJSON from 'ol/format/GeoJSON'
import throttle from 'lodash/throttle'
import { unByKey } from 'ol/Observable'
import { transform } from 'ol/proj'

import { useTranslation } from '@translations/i18n'
import CoordinateInput from './components/CoordinateInput'
import MeasureButton from './components/MeasureButton'
import RecenterButton from './components/RecenterButton'
import ResetButton from './components/ResetButton'
import UnitSelect from './components/UnitSelect'
import ZoomInButton from './components/ZoomInButton'
import ZoomOutButton from './components/ZoomOutButton'
import { GEOJSON_READ_OPTIONS, ZOOM_ANIMATION_DURATION_MS } from './helpers/constants'
import loadGeoJSON from './helpers/loadGeoJSON'
import { fitViewToFeatures } from './helpers/mapSelection'

import useMapCursor from './hooks/useMapCursor'
import useMapInteractions from './hooks/useMapInteractions'
import useMapSelection from './hooks/useMapSelection'
import useOLMap from './hooks/useOLMap'
import useSelectionLayer from './hooks/useSelectionLayer'

const StyledBox = styled(Box)`
  position: relative;

  .ol-measure-tooltip {
    background: rgba(0, 0, 0, 0.75);
    border-radius: 4px;
    color: white;
    cursor: default;
    font-size: 12px;
    padding: 4px 8px;
    user-select: none;
  }

  .ol-measure-tooltip.hidden { display: none; }
  .ol-measure-tooltip-static { background: #ffcc33; color: #000; }
`

const ControlsBox = styled(Box)`
  gap: 15px;
  position: absolute;
  top: 23px;
  right: 20px;
  z-index: 1;
`

const MapContainer = styled.div`
  height: 100%;
  min-height: 400px;
  width: 100%;
`

function sanitizeProperties(properties = {}) {
  return Object.fromEntries(
    Object.entries(properties).filter(([key, value]) => (
      key !== 'geometry' && typeof value !== 'function' && value !== undefined
    ))
  )
}

function GeoMapViewer({
  geoDrawingTask,
  geoJSON = undefined,
  onFeaturesChange = undefined,
  onMapExtentChange = undefined,
  onSelectedFeatureChange = undefined
}) {
  const [isMeasureModeActive, setIsMeasureModeActive] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState('meters')
  const { t } = useTranslation('components')

  const containerRef = useRef()

  const hasGeoDrawingTask = !!(geoDrawingTask && geoDrawingTask.tools.length > 0)
  const activeToolType = geoDrawingTask?.activeTool?.type

  const { map, source, layer, scaleLine } = useOLMap(containerRef)

  const { select, translate } = useMapSelection({
    map,
    source,
    layer,
    geoDrawingTask,
    hasGeoDrawingTask,
    isMeasureModeActive,
    onSelectedFeatureChange
  })

  const { draw, modify, moveToClick, measure } = useMapInteractions({
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
  })

  useSelectionLayer({
    map,
    source,
    layer,
    select,
    geoDrawingTask,
    hasGeoDrawingTask,
    ariaLabel: t('SubjectViewer.GeoMapViewer.DeleteOverlay.ariaLabel')
  })

  useMapCursor({
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
  })

  useEffect(() => {
    loadGeoJSON({ map, source, select, measure, data: geoJSON })
  }, [map, source, select, measure, geoJSON])

  useEffect(() => {
    if (!source || !onFeaturesChange) return undefined
    const format = new GeoJSON()
    function emit() {
      const collection = format.writeFeaturesObject(source.getFeatures(), GEOJSON_READ_OPTIONS)
      onFeaturesChange({
        type: 'FeatureCollection',
        features: collection.features?.map((feature) => ({
          ...feature,
          properties: sanitizeProperties(feature.properties || {})
        })) || []
      })
    }
    const keys = [
      source.on('addfeature', emit),
      source.on('removefeature', emit),
      source.on('changefeature', emit)
    ]
    return () => keys.forEach(unByKey)
  }, [source, onFeaturesChange])

  useEffect(() => {
    if (!map || !onMapExtentChange) return undefined
    function emit() {
      const view = map.getView()
      const extent = view.calculateExtent()
      onMapExtentChange({
        widthMeters: extent[2] - extent[0],
        heightMeters: extent[3] - extent[1],
        resolution: view.getResolution()
      })
    }
    emit()
    const throttled = throttle(emit, ZOOM_ANIMATION_DURATION_MS)
    const key = map.on('moveend', throttled)
    return () => {
      unByKey(key)
      throttled.cancel()
    }
  }, [map, onMapExtentChange])

  const handleRecenter = useCallback(() => {
    if (!map || !source || source.getFeatures().length === 0) return
    fitViewToFeatures(map, source, ZOOM_ANIMATION_DURATION_MS)
  }, [map, source])

  const handleReset = useCallback(() => {
    if (!map || !source || !geoJSON) return
    setIsMeasureModeActive(false)
    loadGeoJSON({ map, source, select, measure, data: geoJSON })
  }, [map, source, select, measure, geoJSON])

  const handleZoom = useCallback((delta) => {
    if (!map) return
    const view = map.getView()
    const target = view.getConstrainedZoom((view.getZoom() ?? 0) + delta)
    view.cancelAnimations()
    view.animate({ zoom: target, duration: ZOOM_ANIMATION_DURATION_MS })
  }, [map])

  const handleToggleMeasureMode = useCallback(() => {
    setIsMeasureModeActive((active) => {
      if (!active) draw?.abortDrawing()
      return !active
    })
  }, [draw])

  const handleCoordinateGo = useCallback(({ latitude, longitude }) => {
    if (!map) return
    const coords = transform([longitude, latitude], GEOJSON_READ_OPTIONS.dataProjection, GEOJSON_READ_OPTIONS.featureProjection)
    const view = map.getView()
    const target = Math.max(view.getZoom() ?? 0, 14)
    view.cancelAnimations()
    view.animate({ center: coords, zoom: target, duration: ZOOM_ANIMATION_DURATION_MS })
  }, [map])

  return (
    <StyledBox forwardedAs='section' fill>
      <ControlsBox>
        <ZoomInButton onClick={() => handleZoom(1)} />
        <ZoomOutButton onClick={() => handleZoom(-1)} />
        <MeasureButton active={isMeasureModeActive} onClick={handleToggleMeasureMode} />
        {geoJSON && (
          <>
            <RecenterButton onClick={handleRecenter} />
            {hasGeoDrawingTask && <ResetButton onClick={handleReset} />}
          </>
        )}
      </ControlsBox>
      <MapContainer
        ref={containerRef}
        aria-label={t('SubjectViewer.GeoMapViewer.mapLabel')}
        role='region'
        className='map-container'
        tabIndex={0}
      />
      <Box direction='row' align='center' gap='small' margin={{ top: 'xsmall' }}>
        <UnitSelect value={selectedUnit} onChange={setSelectedUnit} />
        <CoordinateInput onGoSubmit={handleCoordinateGo} />
      </Box>
    </StyledBox>
  )
}

GeoMapViewer.propTypes = {
  geoDrawingTask: shape({
    tools: arrayOf(shape({ type: string.isRequired, label: string, color: string })),
    type: string.isRequired
  }),
  geoJSON: shape({}),
  onFeaturesChange: func,
  onMapExtentChange: func,
  onSelectedFeatureChange: func
}

export default observer(GeoMapViewer)
