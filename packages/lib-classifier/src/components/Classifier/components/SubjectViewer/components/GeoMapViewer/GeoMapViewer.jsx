// dependencies
import { Box } from 'grommet'
import { arrayOf, shape, string } from 'prop-types'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

// OpenLayers imports
import { Map, View } from 'ol'
import { click } from 'ol/events/condition'
import GeoJSON from 'ol/format/GeoJSON'
import { Translate, Select } from 'ol/interaction'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'

// local imports
import RecenterButton from './components/RecenterButton'
import ResetButton from './components/ResetButton'
import getFeatureStyle from './helpers/getFeatureStyle'

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
// Helper function to fit view to features extent
function fitViewToFeatures(map, features) {
  const view = map.getView()
  view.fit(features.getExtent(), {
    padding: [32, 32, 32, 32],
    maxZoom: 12,
    duration: 250
  })
}

function GeoMapViewer({
  geoDrawingTask,
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

    const hasGeoDrawingTask = geoDrawingTask && geoDrawingTask.tools.length > 0

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

      // Set the style function after map and select are created
      featuresLayer.setStyle((feature) => handleFeatureStyle({
        feature,
        isSelected: select.getFeatures().getArray().includes(feature)
      }))

      // Create translate interaction and add both to map
      const translate = new Translate({
        features: select.getFeatures()
      })
      map.addInteraction(select)
      map.addInteraction(translate)
      selectRef.current = select
      translateRef.current = translate
    } else {
      // No task: disable feature interactions; render static styles
      featuresLayer.setStyle((feature) => handleFeatureStyle({ feature, isSelected: false }))
    }

    mapRef.current = map

    return () => {
      if (selectRef.current) map.removeInteraction(selectRef.current)
      if (translateRef.current) map.removeInteraction(translateRef.current)
      map.setTarget(undefined)
      mapRef.current = undefined
      featuresRef.current = undefined
      featuresLayerRef.current = undefined
      geoJSONFormatRef.current = undefined
      selectRef.current = undefined
      translateRef.current = undefined
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
      }
    }

    return undefined
  }, [geoJSON])
  
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
    }
  }

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
  geoDrawingTask: shape({
    tools: arrayOf(shape({
      type: string.isRequired,
      label: string,
      color: string,
    })),
    type: string.isRequired,
  }),
  geoJSON: shape({})
}

export default GeoMapViewer
