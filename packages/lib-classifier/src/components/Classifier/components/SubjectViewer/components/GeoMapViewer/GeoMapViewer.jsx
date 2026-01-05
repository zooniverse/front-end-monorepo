import { Box } from 'grommet'
import { shape } from 'prop-types'
import { useCallback, useEffect, useRef } from 'react'
import styled from 'styled-components'

// test change 

// OpenLayers imports
import { Map, View } from 'ol'
import { click } from 'ol/events/condition'
import GeoJSON from 'ol/format/GeoJSON'
import { Translate, Select } from 'ol/interaction'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'

import RecenterButton from './components/RecenterButton'
import ResetButton from './components/ResetButton'

const MapContainer = styled.div`
  height: 100%;
  min-height: 400px;
  width: 100%;
`

const ControlsBox = styled(Box)`
  position: absolute;
  top: 80px;
  left: 10px;
  z-index: 1;
`

function GeoMapViewer({
  geoJSON = undefined
}) {
  // Map and layer refs: created once on mount, reused across feature updates
  const mapContainerRef = useRef()
  const mapRef = useRef()
  const featuresRef = useRef()
  const featuresLayerRef = useRef() // needed for interaction setup
  const geoJSONFormatRef = useRef()
  
  // Interaction refs: created once and reused to avoid re-stacking on data updates
  const selectRef = useRef()
  const translateRef = useRef()

  // Shared options for reading GeoJSON and projecting to the map view
  const geoJSONReadOptions = {
    dataProjection: 'EPSG:4326', // incoming GeoJSON coords in WGS 84
    featureProjection: 'EPSG:3857' // map display projection in Web Mercator
  }

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
    })

    // Create interactions once and add to the map
    const select = new Select({
      condition: click,
      layers: [featuresLayer]
    })
    const translate = new Translate({
      features: select.getFeatures()
    })
    map.addInteraction(select)
    map.addInteraction(translate)
    selectRef.current = select
    translateRef.current = translate

    mapRef.current = map

    return () => {
      map.removeInteraction(select)
      map.removeInteraction(translate)
      map.setTarget(undefined)
      mapRef.current = undefined
      featuresRef.current = undefined
      featuresLayerRef.current = undefined
      geoJSONFormatRef.current = undefined
      selectRef.current = undefined
      translateRef.current = undefined
    }
  }, [])

  // Helper function to fit view to features extent
  const fitViewToFeatures = useCallback((map, features) => {
    const view = map.getView()
    view.fit(features.getExtent(), {
      padding: [32, 32, 32, 32],
      maxZoom: 12,
      duration: 250
    })
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
      }
    }

    return undefined
  }, [geoJSON, fitViewToFeatures])

  // Handler to recenter the map to fit all features
  const handleRecenter = useCallback(() => {
    const map = mapRef.current
    const features = featuresRef.current
    if (!map || !features) return

    const featuresList = features.getFeatures()
    if (featuresList.length > 0) {
      fitViewToFeatures(map, features)
    }
  }, [fitViewToFeatures])

  // Handler to reset features to the original geoJSON
  const handleReset = useCallback(() => {
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
    }
  }, [geoJSON, fitViewToFeatures])

  return (
    <Box
      as='section'
      fill
    >
      <MapContainer
        ref={mapContainerRef}
        className='map-container'
        data-testid='geo-map-container'
      />
      {geoJSON && (
        <ControlsBox>
          <RecenterButton onClick={handleRecenter} />
          <ResetButton onClick={handleReset} />
        </ControlsBox>
      )}
    </Box>
  )
}

GeoMapViewer.propTypes = {
  geoJSON: shape({})
}

export default GeoMapViewer
