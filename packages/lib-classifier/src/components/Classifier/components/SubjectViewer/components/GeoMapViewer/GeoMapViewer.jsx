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
  width: 100%;
`

function GeoMapViewer({
  geoJSON = undefined
}) {
  const mapRef = useRef()
  const selectRef = useRef()
  const translateRef = useRef()

  useEffect(function loadMap() {
    let map

    function createMap(target) {
      const osmLayer = new TileLayer({
        // preload tiles for 1 level of zooming
        preload: 1,
        // use OpenStreetMap as the base layer
        source: new OSM(),
      })

      const vectorSource = new VectorSource({
        features: geoJSON ? new GeoJSON().readFeatures(geoJSON, {
          dataProjection: 'EPSG:4326', // incoming GeoJSON coords in WGS 84
          featureProjection: 'EPSG:3857' // map display projection in Web Mercator
        }) : []
      })

      const vectorLayer = new VectorLayer({
        source: vectorSource
      })

      const map = new Map({
        target,
        layers: [
          osmLayer,
          vectorLayer
        ],
        view: new View({
          center: [0, 0],
          zoom: 0,
        }),
      })

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

      return map
    }

    function unloadMap(mapInstance) {
      if (mapInstance) {
        if (selectRef.current) {
          mapInstance.removeInteraction(selectRef.current)
          selectRef.current = undefined
        }
        if (translateRef.current) {
          mapInstance.removeInteraction(translateRef.current)
          translateRef.current = undefined
        }
        mapInstance.setTarget(undefined)
      }
    }

    if (mapRef.current) {
      map = createMap(mapRef.current)
    }

    return () => unloadMap(map)
  }, [geoJSON])

  return (
    <Box
      as='section'
      fill='horizontal'
      height='600px'
    >
      <MapContainer
        ref={mapRef}
        className='map-container'
        data-testid='geo-map-container'
      />
    </Box>
  )
}

GeoMapViewer.propTypes = {
  geoJSON: shape({
    type: string,
    features: arrayOf(shape({
      type: string,
      geometry: shape({
        type: string,
        coordinates: arrayOf(number)
      }),
      properties: shape({})
    }))
  })
}

export default GeoMapViewer
