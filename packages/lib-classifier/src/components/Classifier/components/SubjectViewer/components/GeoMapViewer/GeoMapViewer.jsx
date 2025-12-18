import { Box } from 'grommet'
import { arrayOf, number, shape, string } from 'prop-types'
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

const MapContainer = styled.div`
  height: 100%;
  min-height: 400px;
  width: 100%;
`

function GeoMapViewer({
  geoJSON = undefined
}) {
  // mapContainerRef: reference to the map container DOM element
  const mapContainerRef = useRef()
  // mapRef: reference to the OpenLayers Map instance
  const mapRef = useRef()
  // featuresRef: reference to the OpenLayers VectorSource for GeoJSON features
  const featuresRef = useRef()
  // geoJSONFormatRef: reference to the OpenLayers GeoJSON format reader
  const geoJSONFormatRef = useRef()
  
  const selectRef = useRef()
  const translateRef = useRef()

  // Create the map once on mount
  useEffect(function createMapOnce() {
    // if the map is already created, do nothing
    // or if the map container ref is not set yet, do nothing
    if (mapRef.current || !mapContainerRef.current) return undefined

    // create a GeoJSON format reader
    const format = new GeoJSON()
    geoJSONFormatRef.current = format

    const osmLayer = new TileLayer({
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
        osmLayer,
        featuresLayer
      ],
      view: new View({
        center: [0, 0],
        zoom: 0,
      }),
    })

    mapRef.current = map

    return () => {
      map.setTarget(undefined)
      mapRef.current = undefined
      featuresRef.current = undefined
      geoJSONFormatRef.current = undefined
    }
  }, [])

  // Update features when geoJSON changes, without recreating the map
  useEffect(function updateFeatures() {
    const map = mapRef.current
    const features = featuresRef.current
    // if the map or features source is not ready yet, do nothing
    if (!map || !features) return undefined

    // get or create the GeoJSON format reader
    const format = geoJSONFormatRef.current || new GeoJSON()
    geoJSONFormatRef.current = format

    // clear existing features
    features.clear()

    if (geoJSON) {
      // read and add new features from the provided GeoJSON
      const geoJSONfeatures = format.readFeatures(geoJSON, {
        dataProjection: 'EPSG:4326', // incoming GeoJSON coords in WGS 84
        featureProjection: 'EPSG:3857' // map display projection in Web Mercator
      })
      features.addFeatures(geoJSONfeatures)
    }
    
    const select = new Select({
      condition: click,
      layers: [vectorLayer]
    })

    const translate = new Translate({
      features: select.getFeatures()
    })

    map.addInteraction(select)
    map.addInteraction(translate)

    selectRef.current = select
    translateRef.current = translate

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
