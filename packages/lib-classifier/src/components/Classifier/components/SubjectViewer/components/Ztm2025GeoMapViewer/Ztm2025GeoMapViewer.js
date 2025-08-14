import { useEffect, useId } from 'react'
// import 'ol/ol.css'  // TODO: check if this does anything.
import olCss from 'ol/ol.css'  // TODO: check if this does anything.
import OpenLayersMap from 'ol/Map.js'
import OpenStreetMaps from 'ol/source/OSM.js'
import TileLayer from 'ol/layer/Tile.js'
import View from 'ol/View.js'


function Ztm2025GeoMapViewer (props) {
  const olMapId = useId()
  let olMap = undefined

  console.log('+++ check what\'s ol.css:', olCss)

  useEffect(function loadMap () {
    // Init map
    olMap = new OpenLayersMap({
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
      <h6>Ztm2025GeoMapViewer</h6>
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

export default Ztm2025GeoMapViewer