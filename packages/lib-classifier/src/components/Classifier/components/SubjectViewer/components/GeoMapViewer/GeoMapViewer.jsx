import { Box } from 'grommet'
import { Map, View } from 'ol'
import GeoJSON from 'ol/format/GeoJSON'
import TileLayer from 'ol/layer/Tile'
import VectorLayer from 'ol/layer/Vector'
import OSM from 'ol/source/OSM'
import VectorSource from 'ol/source/Vector'
import { arrayOf, number, shape, string } from 'prop-types'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const MapContainer = styled.div`
  height: 100%;
  min-height: 400px;
  width: 100%;
`

function GeoMapViewer({
  geoJSON = undefined
}) {
  const mapRef = useRef()

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

      return map
    }

    function unloadMap(mapInstance) {
      if (mapInstance) {
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
      fill
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
