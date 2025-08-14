import { useEffect, useId } from 'react'
import 'ol/ol.css'  // this automatically inserts additional CSS into the rendered document's <style>
import OLMap from 'ol/Map.js'
import OpenStreetMaps from 'ol/source/OSM.js'
import TileLayer from 'ol/layer/Tile.js'
import View from 'ol/View.js'

function OpenLayersGeoMap (props) {
  const olMapId = useId()
  let olMap = undefined

  useEffect(function loadMap () {
    // Init map
    olMap = new OLMap({
      target: olMapId,
    })

    // Set map tiles
    const osmSource = new OpenStreetMaps()
    const osmLayer = new TileLayer({source: osmSource});
    olMap.addLayer(osmLayer);

    // Set view on map
    olMap.setView(new View({
      center: [0, 0],
      zoom: 2,
    }))

    return function unloadMap () {
      olMap?.setTarget(undefined)
    }
  }, [])

  return (
    <div>
      <h6 style={{ margin: '0.25em', padding: 0 }}>OpenLayersGeoMap</h6>
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

export default OpenLayersGeoMap