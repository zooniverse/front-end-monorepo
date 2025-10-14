import { useEffect, useId } from 'react'
import OLMap from 'ol/Map'
import OpenStreetMaps from 'ol/source/OSM'
import TileLayer from 'ol/layer/Tile'
import View from 'ol/View'
import OpenLayersCss from './OpenLayersCss'  // replaces import 'ol/ol.css'
import { transform as transformCoordinates } from 'ol/proj'

function GeoMapViewer ({
  data
}) {
  const olMapId = useId()
  let olMap = undefined

  // Note on projections and coordinates:
  // By default, OpenLayers uses the Web Mercator (EPSG:3857) projection, which
  // is used by most web mapping apps. (e.g. Google Maps)

  // Web Mercator's units are in metres, while GPS coordinates (WGS84, or
  // EPSG:4326) use degrees. We'll need to convert common latitude/longitude
  // coordinates for use on our map.

  // e.g. Buckingham Palace is at latitude 51°30'5.94" N and longitude
  // 0°8'30.66" W (51.50165, -0.14185), which converts to 
  // x=-15790.669769025857 and y=6710514.145334988

  // Render the map!
  // --------------------------------

  useEffect(function loadMap () {
    console.log('+++ 🟢 loadMap')
    // Init map
    olMap = new OLMap({ target: olMapId })

    // Set map tiles
    const osmSource = new OpenStreetMaps()
    const osmLayer = new TileLayer({source: osmSource})
    olMap.addLayer(osmLayer)

    // Set view on map
    const mapView = new View({
      center: [0, 0],  // longitude (West is negative, East is positive), latitude (South is negative, North is positive)
      // projection: 'EPSG:3857'  // By default, we use Web Mercator
      zoom: 1,
    })
    olMap.setView(mapView)

    return function unloadMap () {
      console.log('+++ 🔴 unloadMap')
      olMap?.setTarget(undefined)
    }
  }, [])

  // Load the Subject data!
  // --------------------------------

  useEffect(function loadSubjectData () {
    console.log('+++ loadSubjectData: ', (data) ? '✔️' : '✖')
    
    // TODO: handle loading and error states
    if (!olMap || !data) return

    const dataCoords = transformCoordinates([ data.long, data.lat ], 'EPSG:4326', 'EPSG:3857')
    const dataZoom = data.zoom ?? 4

    // Set a new map view
    const mapView = new View({
      center: dataCoords,  // longitude (West is negative, East is positive), latitude (South is negative, North is positive)
      // projection: 'EPSG:3857'  // By default, we use Web Mercator
      zoom: dataZoom,
    })
    olMap.setView(mapView)

  }, [data])

  // --------------------------------

  return (
    <div>
      <OpenLayersCss />
      <h6 style={{ margin: '0.25em', padding: 0 }}>{data?.info || '----'}</h6>
      <div
        id={olMapId}
        style={{
          width: '100%',
          height: '400px'
        }}
      ></div>
    </div>
  )
}

export default GeoMapViewer