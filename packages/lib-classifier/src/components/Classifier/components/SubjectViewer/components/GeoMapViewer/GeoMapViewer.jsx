import { Box } from 'grommet'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'
import { useEffect, useRef } from 'react'
import styled from 'styled-components'

const MapContainer = styled.div`
  height: 100%;
  width: 100%;
`

function GeoMapViewer() {
  const mapRef = useRef()

  useEffect(function loadMap() {
    let map

    function createMap(target) {
      const osmLayer = new TileLayer({
        preload: Infinity,
        source: new OSM(),
      })

      return new Map({
        target,
        layers: [osmLayer],
        view: new View({
          center: [0, 0],
          zoom: 0,
        }),
      })
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
  }, [])

  return (
    <Box
      as='section'
      fill='horizontal'
      height='400px'
    >
      <MapContainer
        ref={mapRef}
        className='map-container'
      />
    </Box>
  )
}

export default GeoMapViewer
