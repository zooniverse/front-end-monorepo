// dependencies
import { Box } from 'grommet'
import { arrayOf, func, shape, string } from 'prop-types'
import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import throttle from 'lodash/throttle'

// OpenLayers imports
import { Map, View } from 'ol'
import { defaults as defaultControls } from 'ol/control/defaults'
import ScaleLine from 'ol/control/ScaleLine'
import { click } from 'ol/events/condition'
import GeoJSON from 'ol/format/GeoJSON'
import { Translate, Select } from 'ol/interaction'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { unByKey } from 'ol/Observable'

// local imports
import { useTranslation } from '@translations/i18n'
import MeasureButton from './components/MeasureButton'
import RecenterButton from './components/RecenterButton'
import ResetButton from './components/ResetButton'
import ZoomInButton from './components/ZoomInButton'
import ZoomOutButton from './components/ZoomOutButton'
import getFeatureStyle from './helpers/getFeatureStyle'
import createMeasureInteraction from './helpers/createMeasureInteraction'
import createModifyUncertaintyInteraction from './helpers/createModifyUncertaintyInteraction'
import createMoveToClickInteraction from './helpers/createMoveToClickInteraction'
import asMSTFeature from './helpers/asMSTFeature'

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

  .ol-measure-tooltip.hidden {
    display: none;
  }

  .ol-measure-tooltip-static {
    background: #ffcc33;
    color: #000;
  }
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

const ZOOM_ANIMATION_DURATION_MS = 250

// Helper function to fit view to features extent
function fitViewToFeatures(map, features) {
  const view = map.getView()
  view.fit(features.getExtent(), {
    padding: [32, 32, 32, 32],
    maxZoom: 12,
    duration: 250
  })
}

function selectFirstFeature(selectInteraction, newFeatures) {
  if (!selectInteraction || newFeatures.length === 0) return

  selectInteraction.getFeatures().clear()
  selectInteraction.getFeatures().push(newFeatures[0])

  selectInteraction.dispatchEvent({
    type: 'select',
    selected: [newFeatures[0]],
    deselected: []
  })
}

function clearSelectedFeature(selectInteraction) {
  if (!selectInteraction) return

  const deselected = [...selectInteraction.getFeatures().getArray()]

  if (deselected.length === 0) return

  selectInteraction.getFeatures().clear()
  selectInteraction.dispatchEvent({
    type: 'select',
    selected: [],
    deselected
  })
}

function GeoMapViewer({
  geoDrawingTask,
  geoJSON = undefined,
  onFeaturesChange = undefined,
  onMapExtentChange = undefined,
  onSelectedFeatureChange = undefined
}) {
  const [isMeasureModeActive, setIsMeasureModeActive] = useState(false)
  const { t } = useTranslation('components')

  // Map and layer refs: created once on mount, reused across feature updates
  const mapContainerRef = useRef()
  const mapRef = useRef()
  const featuresRef = useRef()
  const featuresLayerRef = useRef() // needed for interaction setup
  const geoJSONFormatRef = useRef()
  const isMeasureModeActiveRef = useRef(false)
  
  // Interaction refs: created once and reused to avoid re-stacking on data updates
  const selectRef = useRef()
  const translateRef = useRef()
  const modifyUncertaintyRef = useRef()
  const moveToClickRef = useRef()
  const measureInteractionRef = useRef()
  const pointerMoveHandlerRef = useRef()

  // Shared options for reading GeoJSON and projecting to the map view
  const geoJSONReadOptions = {
    dataProjection: 'EPSG:4326', // incoming GeoJSON coords in WGS 84
    featureProjection: 'EPSG:3857' // map display projection in Web Mercator
  }

  const hasGeoDrawingTask = geoDrawingTask && geoDrawingTask.tools.length > 0

  // Create the map once on mount with all layers and interactions
  // Interactions are created here and reused on data updates to avoid stacking event listeners
  useEffect(function createMapOnce() {
    // if the map is already created, do nothing
    // or if the map container ref is not set yet, do nothing
    if (mapRef.current || !mapContainerRef.current) return undefined

    // create a GeoJSON format reader
    const geoJSONFormat = new GeoJSON()
    geoJSONFormatRef.current = geoJSONFormat

    const baseLayer = new TileLayer({
      // preload tiles for 1 level of zooming
      preload: 1,
      // use OpenStreetMap as the base layer
      source: new OSM(),
    })

    // create a vector source and layer for the GeoJSON features
    const featuresSource = new VectorSource({
      features: []
    })
    featuresRef.current = featuresSource
    const featuresLayer = new VectorLayer({
      source: featuresSource
    })
    featuresLayerRef.current = featuresLayer

    const map = new Map({
      target: mapContainerRef.current,
      layers: [
        baseLayer,
        featuresLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
      controls: defaultControls({ zoom: false }).extend([
        new ScaleLine()
      ])
    })

    // Helper to compute style with current resolution
    function handleFeatureStyle({ feature, isSelected = false }) {
      return getFeatureStyle({
        feature,
        geoDrawingTask: hasGeoDrawingTask ? geoDrawingTask : null,
        isSelected,
        resolution: map.getView().getResolution()
      })
    }

    if (hasGeoDrawingTask) {
      // Create select interaction first so it's available to style function
      const select = new Select({
        condition: click,
        layers: [featuresLayer],
        style: (feature) => handleFeatureStyle({ feature, isSelected: true })
      })

      // Sync active feature selection
      select.on('select', (event) => {
        const selected = event.selected?.[0]
        const mstFeature = selected ? asMSTFeature(selected) : null

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

      // Set the style function after map and select are created
      featuresLayer.setStyle((feature) => handleFeatureStyle({
        feature,
        isSelected: select.getFeatures().getArray().includes(feature)
      }))

      // Create translate interaction
      const translate = new Translate({
        features: select.getFeatures()
      })

      // Add select and translate interactions to the map
      map.addInteraction(select)
      map.addInteraction(translate)
      selectRef.current = select
      translateRef.current = translate

      // Create and add uncertainty circle modification interaction
      const modifyUncertainty = createModifyUncertaintyInteraction({
        geoDrawingTask,
        selectInteraction: select,
        translateInteraction: translate
      })
      map.addInteraction(modifyUncertainty)
      modifyUncertaintyRef.current = modifyUncertainty

      // Create and add move-to-click interaction
      const moveToClick = createMoveToClickInteraction({
        selectInteraction: select,
        geoDrawingTask,
        featuresLayer
      })
      map.addInteraction(moveToClick)
      moveToClickRef.current = moveToClick
      
      // Add pointer cursor on feature hover
      const handlePointerMove = (event) => {
        if (isMeasureModeActiveRef.current) {
          const element = map.getTargetElement()

          if (element) {
            element.style.cursor = ''
          }

          return
        }

        const hit = map.hasFeatureAtPixel(event.pixel, {
          layerFilter: (layer) => layer === featuresLayer
        })
        const element = map.getTargetElement()
        if (element) {
          element.style.cursor = hit ? 'pointer' : ''
        }
      }
      map.on('pointermove', handlePointerMove)
      pointerMoveHandlerRef.current = handlePointerMove
    } else {
      // No task: disable feature interactions; render static styles
      featuresLayer.setStyle((feature) => handleFeatureStyle({ feature, isSelected: false }))
    }

    const measureInteraction = createMeasureInteraction({
      map,
      messages: {
        clickToContinue: t('SubjectViewer.GeoMapViewer.MeasureInteraction.clickToContinue'),
        clickToStart: t('SubjectViewer.GeoMapViewer.MeasureInteraction.clickToStart')
      }
    })
    measureInteractionRef.current = measureInteraction

    mapRef.current = map

    return () => {
      if (selectRef.current) map.removeInteraction(selectRef.current)
      if (translateRef.current) map.removeInteraction(translateRef.current)
      if (modifyUncertaintyRef.current) map.removeInteraction(modifyUncertaintyRef.current)
      if (moveToClickRef.current) map.removeInteraction(moveToClickRef.current)
      measureInteractionRef.current?.destroy()
      if (pointerMoveHandlerRef.current) map.un('pointermove', pointerMoveHandlerRef.current)
      map.setTarget(undefined)
      mapRef.current = undefined
      featuresRef.current = undefined
      featuresLayerRef.current = undefined
      geoJSONFormatRef.current = undefined
      selectRef.current = undefined
      translateRef.current = undefined
      modifyUncertaintyRef.current = undefined
      moveToClickRef.current = undefined
      measureInteractionRef.current = undefined
      pointerMoveHandlerRef.current = undefined
    }
  }, [])

  useEffect(function syncMeasureMode() {
    isMeasureModeActiveRef.current = isMeasureModeActive

    measureInteractionRef.current?.setActive(isMeasureModeActive)

    if (isMeasureModeActive) {
      clearSelectedFeature(selectRef.current)
    }

    selectRef.current?.setActive(!isMeasureModeActive)
    translateRef.current?.setActive(!isMeasureModeActive)
    modifyUncertaintyRef.current?.setActive(!isMeasureModeActive)
    moveToClickRef.current?.setActive(!isMeasureModeActive)

    if (!isMeasureModeActive) {
      const features = featuresRef.current?.getFeatures() ?? []
      selectFirstFeature(selectRef.current, features)
    }

    const mapElement = mapRef.current?.getTargetElement()

    if (mapElement && isMeasureModeActive) {
      mapElement.style.cursor = ''
    }

    return undefined
  }, [isMeasureModeActive])

  // Update feature data when geoJSON changes
  // This effect only updates the vector source; map and interactions remain unchanged
  useEffect(function updateFeatures() {
    const map = mapRef.current
    const features = featuresRef.current
    // if the map or features source is not ready yet, do nothing
    if (!map || !features) return undefined

    // get or create the GeoJSON format reader
    const geoJSONFormat = geoJSONFormatRef.current || new GeoJSON()
    geoJSONFormatRef.current = geoJSONFormat

    measureInteractionRef.current?.clear()

    // clear existing features
    features.clear()

    if (geoJSON) {
      // read and add new features from the provided GeoJSON
      const newFeatures = geoJSONFormat.readFeatures(geoJSON, geoJSONReadOptions)
      features.addFeatures(newFeatures)

      // Fit the view to the features extent
      if (features.getFeatures().length) {
        fitViewToFeatures(map, features)

        selectFirstFeature(selectRef.current, newFeatures)
      }
    }

    return undefined
  }, [geoJSON])

  // Track map extent changes and notify the task
  useEffect(function trackMapExtent() {
    const map = mapRef.current
    if (!map || !onMapExtentChange) return undefined

    function updateExtent() {
      const view = map.getView()
      const extent = view.calculateExtent()
      const widthMeters = extent[2] - extent[0]
      const heightMeters = extent[3] - extent[1]
      
      onMapExtentChange({
        widthMeters,
        heightMeters,
        resolution: view.getResolution()
      })
    }

    // Initial calculation
    updateExtent()

    // Update on view changes (throttled)
    const throttledUpdate = throttle(updateExtent, 250)
    const key = map.on('moveend', throttledUpdate)

    return () => {
      unByKey(key)
      throttledUpdate.cancel()
    }
  }, [onMapExtentChange])

  // Listen for feature changes and persist as a sanitized FeatureCollection
  useEffect(function attachFeatureListeners() {
    if (!onFeaturesChange) return undefined

    const featuresSource = featuresRef.current
    if (!featuresSource) return undefined

    const geoJSONFormat = geoJSONFormatRef.current || new GeoJSON()
    geoJSONFormatRef.current = geoJSONFormat

    function sanitizeProperties(properties = {}) {
      return Object.fromEntries(
        Object.entries(properties).filter(([key, value]) => (
          key !== 'geometry' && typeof value !== 'function' && value !== undefined
        ))
      )
    }

    function serializeAndNotify() {
      const olFeatures = featuresSource.getFeatures()
      const featureCollection = geoJSONFormat.writeFeaturesObject(olFeatures, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      })

      const sanitizedFeatures = featureCollection.features?.map((feature) => ({
        ...feature,
        properties: sanitizeProperties(feature.properties || {})
      })) || []

      onFeaturesChange({
        type: 'FeatureCollection',
        features: sanitizedFeatures
      })
    }

    const keys = [
      featuresSource.on('addfeature', serializeAndNotify),
      featuresSource.on('removefeature', serializeAndNotify),
      featuresSource.on('changefeature', serializeAndNotify)
    ]

    return () => {
      keys.forEach((key) => unByKey(key))
    }
  }, [onFeaturesChange])
  
  // Handler to recenter the map to fit all features
  function handleRecenter() {
    const map = mapRef.current
    const features = featuresRef.current
    if (!map || !features) return

    const featuresList = features.getFeatures()
    if (featuresList.length > 0) {
      fitViewToFeatures(map, features)
    }
  }

  // Handler to reset features to the original geoJSON
  function handleReset() {
    const map = mapRef.current
    const features = featuresRef.current
    if (!map || !features || !geoJSON) return

    setIsMeasureModeActive(false)

    const geoJSONFormat = geoJSONFormatRef.current || new GeoJSON()
    geoJSONFormatRef.current = geoJSONFormat
    measureInteractionRef.current?.clear()

    // clear existing features
    features.clear()

    // read and add features from the provided geoJSON
    const newFeatures = geoJSONFormat.readFeatures(geoJSON, geoJSONReadOptions)
    features.addFeatures(newFeatures)

    // Fit the view to the features extent
    if (features.getFeatures().length) {
      fitViewToFeatures(map, features)
      selectFirstFeature(selectRef.current, newFeatures)
    }
  }

  // Handler to zoom the map view in by one level
  function handleZoomIn() {
    const map = mapRef.current
    if (!map) return

    const view = map.getView()
    const currentZoom = view.getZoom() ?? 0
    const targetZoom = view.getConstrainedZoom(currentZoom + 1)
    view.cancelAnimations()
    view.animate({
      zoom: targetZoom,
      duration: ZOOM_ANIMATION_DURATION_MS
    })
  }

  // Handler to zoom the map view out by one level
  function handleZoomOut() {
    const map = mapRef.current
    if (!map) return

    const view = map.getView()
    const currentZoom = view.getZoom() ?? 0
    const targetZoom = view.getConstrainedZoom(currentZoom - 1)
    view.cancelAnimations()
    view.animate({
      zoom: targetZoom,
      duration: ZOOM_ANIMATION_DURATION_MS
    })
  }

  function handleToggleMeasureMode() {
    setIsMeasureModeActive((active) => !active)
  }

  return (
    <StyledBox
      forwardedAs='section'
      fill
    >
      <ControlsBox>
        <ZoomInButton onClick={handleZoomIn} />
        <ZoomOutButton onClick={handleZoomOut} />
        <MeasureButton
          active={isMeasureModeActive}
          onClick={handleToggleMeasureMode}
        />
        {geoJSON && (
          <>
            <RecenterButton onClick={handleRecenter} />
            {hasGeoDrawingTask && (
              <ResetButton onClick={handleReset} />
            )}
          </>
        )}
      </ControlsBox>
      <MapContainer
        ref={mapContainerRef}
        className='map-container'
        data-testid='geo-map-container'
      />
    </StyledBox>
  )
}

GeoMapViewer.propTypes = {
  geoDrawingTask: shape({
    tools: arrayOf(shape({
      type: string.isRequired,
      label: string,
      color: string,
    })),
    type: string.isRequired,
  }),
  geoJSON: shape({}),
  onFeaturesChange: func,
  onMapExtentChange: func,
  onSelectedFeatureChange: func
}

export default GeoMapViewer
