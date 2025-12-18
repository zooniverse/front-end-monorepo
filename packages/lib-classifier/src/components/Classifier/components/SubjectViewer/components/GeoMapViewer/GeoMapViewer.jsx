import { Box } from 'grommet'
import { shape } from 'prop-types'
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
import Control from 'ol/control/Control'

const MapContainer = styled.div`
  height: 100%;
  min-height: 400px;
  width: 100%;
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
  
  const initialViewRef = useRef()
  const recenterControlRef = useRef()

  // Interaction refs: created once and reused to avoid re-stacking on data updates
  const selectRef = useRef()
  const translateRef = useRef()

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
    
    // Fit the view to all features so everything starts visible
      if (vectorSource.getFeatures().length) {
        const view = map.getView()
        view.fit(vectorSource.getExtent(), {
          padding: [32, 32, 32, 32],
          maxZoom: 12,
        })
        // Capture initial view AFTER the fit animation completes
        map.once('moveend', () => {
          const v = map.getView()
          initialViewRef.current = {
            center: (v.getCenter() || [0, 0]).slice(),
            zoom: v.getZoom() ?? 0,
            resolution: v.getResolution() ?? undefined,
            rotation: v.getRotation() ?? 0
          }
        })
      } else {
        // No features: capture the default initial view immediately
        const v = map.getView()
        initialViewRef.current = {
          center: (v.getCenter() || [0, 0]).slice(),
          zoom: v.getZoom() ?? 0,
          resolution: v.getResolution() ?? undefined,
          rotation: v.getRotation() ?? 0
        }
      }

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
      const newFeatures = geoJSONFormat.readFeatures(geoJSON, {
        dataProjection: 'EPSG:4326', // incoming GeoJSON coords in WGS 84
        featureProjection: 'EPSG:3857' // map display projection in Web Mercator
      })
      features.addFeatures(newFeatures)
    }

    return undefined
  }, [geoJSON])

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
    </Box>
  )
}

GeoMapViewer.propTypes = {
  geoJSON: shape({})
}

export default GeoMapViewer
