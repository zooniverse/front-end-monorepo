// dependencies
import { Box } from 'grommet'
import { arrayOf, func, shape, string } from 'prop-types'
import { useEffect, useRef } from 'react'
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
import { isPixelNearDragHandle } from '@plugins/tasks/experimental/geoDrawing/features/models/Point/dragHandle'
import RecenterButton from './components/RecenterButton'
import ResetButton from './components/ResetButton'
import ZoomInButton from './components/ZoomInButton'
import ZoomOutButton from './components/ZoomOutButton'
import asMSTFeature from './helpers/asMSTFeature'
import createModifyUncertaintyInteraction, { isPixelNearPointCenter, POINT_CENTER_HIT_RADIUS_PIXELS } from './helpers/createModifyUncertaintyInteraction'
import createMoveToClickInteraction from './helpers/createMoveToClickInteraction'
import getFeatureStyle from './helpers/getFeatureStyle'
import getPixelDistance from './helpers/getPixelDistance'

const StyledBox = styled(Box)`
  position: relative;
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

// Helper to select the first feature in a list, used after loading new features, resetting, etc.
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

function GeoMapViewer({
  geoDrawingTask,
  geoJSON = undefined,
  onFeaturesChange = undefined,
  onMapExtentChange = undefined,
  onSelectedFeatureChange = undefined
}) {
  // Map and layer refs: created once on mount, reused across feature updates
  const mapContainerRef = useRef()
  const mapRef = useRef()
  const featuresRef = useRef()
  const geoJSONFormatRef = useRef()
  
  // Interaction refs: created once and reused to avoid re-stacking on data updates
  const selectRef = useRef()
  const translateRef = useRef()
  const modifyUncertaintyRef = useRef()
  const moveToClickRef = useRef()
  const pointerMoveHandlerRef = useRef()

  // Shared options for reading GeoJSON and projecting to the map view
  const geoJSONReadOptions = {
    dataProjection: 'EPSG:4326', // incoming GeoJSON coords in WGS 84
    featureProjection: 'EPSG:3857' // map display projection in Web Mercator
  }

  // Determine if we have an active drawing task with tools, to enable interactions and show reset features button
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

      // Create translate interaction restricted to the center point hit area.
      // Without a condition, OL's Translate uses its own hit detection against the
      // feature's rendered style (which includes the uncertainty circle), causing
      // drags anywhere inside the circle to move the feature. The condition limits
      // translation to pointerdown events within POINT_CENTER_HIT_RADIUS_PIXELS of
      // the feature center.
      const translate = new Translate({
        features: select.getFeatures(),
        condition: (mapBrowserEvent) => {
          const selectedFeatures = select.getFeatures().getArray()
          if (selectedFeatures.length === 0) return false

          const selectedFeature = selectedFeatures[0]
          const pointCoordinates = selectedFeature.getGeometry()?.getCoordinates?.()
          if (!Array.isArray(pointCoordinates)) return false

          const pointPixel = map.getPixelFromCoordinate(pointCoordinates)
          return isPixelNearPointCenter({
            pixel: mapBrowserEvent.pixel,
            pointPixel,
            radius: POINT_CENTER_HIT_RADIUS_PIXELS
          })
        }
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

      // Track whether a point is actively being dragged to switch grab → grabbing.
      // Center-point drags are captured by moveToClick (not Translate), so we use
      // onDragStart/onDragEnd callbacks to update the cursor immediately on press.
      let isDraggingPoint = false

      // Create and add move-to-click interaction
      const moveToClick = createMoveToClickInteraction({
        selectInteraction: select,
        geoDrawingTask,
        featuresLayer,
        onDragStart: () => {
          isDraggingPoint = true
          const viewport = map.getViewport()
          if (viewport) viewport.style.cursor = 'grabbing'
        },
        onDragEnd: () => {
          isDraggingPoint = false
          const viewport = map.getViewport()
          if (viewport) viewport.style.cursor = 'grab'
        }
      })
      map.addInteraction(moveToClick)
      moveToClickRef.current = moveToClick

      // Add cursor states that match the active interactions.
      // Note: we target the viewport element (not the outer target element) so that
      // our inline style.cursor overrides OL's class-based cursor (ol-grab, ol-grabbing)
      // which Translate sets on the viewport via classList.
      const handlePointerMove = (event) => {
        const element = map.getViewport()
        if (!element) return

        let cursor = ''
        const selectedFeature = select.getFeatures().item(0)

        if (selectedFeature) {
          const mstFeature = asMSTFeature(selectedFeature)
          const pointCoordinates = selectedFeature.getGeometry()?.getCoordinates?.()

          if (mstFeature && Array.isArray(pointCoordinates)) {
            const pointPixel = map.getPixelFromCoordinate(pointCoordinates)
            const dragHandleCoordinates = mstFeature.getDragHandleCoordinates?.({
              feature: selectedFeature,
              geoDrawingTask
            })

            // If we're near the feature center, grab/grabbing takes priority
            if (isPixelNearPointCenter({
              pixel: event.pixel,
              pointPixel,
              radius: POINT_CENTER_HIT_RADIUS_PIXELS
            })) {
              cursor = isDraggingPoint ? 'grabbing' : 'grab'
            }

            // If we're near the drag handle, show the resize cursor
            if (!cursor && dragHandleCoordinates) {
              const dragHandlePixel = map.getPixelFromCoordinate(dragHandleCoordinates)
              if (isPixelNearDragHandle({
                pixel: event.pixel,
                handlePixel: dragHandlePixel,
                tolerance: 15
              })) {
                cursor = 'ew-resize'
              }
            }

            // If the feature has an uncertainty radius, show the default cursor when hovering over it
            if (!cursor) {
              const uncertaintyRadiusPixels = mstFeature.getUncertaintyRadiusPixels?.({
                feature: selectedFeature,
                geoDrawingTask,
                resolution: map.getView().getResolution()
              })

              if (
                typeof uncertaintyRadiusPixels === 'number'
                && uncertaintyRadiusPixels > 0
                && getPixelDistance(event.pixel, pointPixel) <= uncertaintyRadiusPixels
              ) {
                cursor = 'default'
              }
            }
          }
        }

        if (!cursor) {
          if (selectedFeature) {
            // When a feature is selected, only show pointer over another feature's center point (which is selectable)
            let hoveringOtherCenter = false
            featuresLayer.getSource().forEachFeature((feature) => {
              if (feature === selectedFeature || hoveringOtherCenter) return
              const coords = feature.getGeometry()?.getCoordinates?.()
              if (!Array.isArray(coords)) return
              const featurePixel = map.getPixelFromCoordinate(coords)
              if (isPixelNearPointCenter({ pixel: event.pixel, pointPixel: featurePixel, radius: POINT_CENTER_HIT_RADIUS_PIXELS })) {
                hoveringOtherCenter = true
              }
            })
            cursor = hoveringOtherCenter ? 'pointer' : 'default'
          } else {
            const hit = map.hasFeatureAtPixel(event.pixel, {
              layerFilter: (layer) => layer === featuresLayer
            })
            cursor = hit ? 'pointer' : 'default'
          }
        }

        element.style.cursor = cursor
      }
      map.on('pointermove', handlePointerMove)
      pointerMoveHandlerRef.current = handlePointerMove
    } else {
      // No task: disable feature interactions; render static styles
      featuresLayer.setStyle((feature) => handleFeatureStyle({ feature, isSelected: false }))
    }

    mapRef.current = map

    return () => {
      if (selectRef.current) map.removeInteraction(selectRef.current)
      if (translateRef.current) map.removeInteraction(translateRef.current)
      if (modifyUncertaintyRef.current) map.removeInteraction(modifyUncertaintyRef.current)
      if (moveToClickRef.current) map.removeInteraction(moveToClickRef.current)
      if (pointerMoveHandlerRef.current) map.un('pointermove', pointerMoveHandlerRef.current)
      map.setTarget(undefined)
      mapRef.current = undefined
      featuresRef.current = undefined
      geoJSONFormatRef.current = undefined
      selectRef.current = undefined
      translateRef.current = undefined
      modifyUncertaintyRef.current = undefined
      moveToClickRef.current = undefined
      pointerMoveHandlerRef.current = undefined
    }
  }, [])

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

    const geoJSONFormat = geoJSONFormatRef.current || new GeoJSON()
    geoJSONFormatRef.current = geoJSONFormat

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

  return (
    <StyledBox
      forwardedAs='section'
      fill
    >
      <ControlsBox>
        <ZoomInButton onClick={handleZoomIn} />
        <ZoomOutButton onClick={handleZoomOut} />
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
