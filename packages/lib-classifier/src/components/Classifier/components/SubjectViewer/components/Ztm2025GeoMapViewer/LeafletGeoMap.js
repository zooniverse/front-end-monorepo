import { useEffect, useId } from 'react'
import Leaflet from 'leaflet'
// import 'leaflet/dist/leaflet.css'

function LeafletGeoMap (props) {
  const leafMapId = useId()
  let leafMap = undefined

  useEffect(function loadMap () {
    // Init map
    leafMap = Leaflet.map(leafMapId)

    // Set map tiles
    Leaflet.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(leafMap);

    // Set view on map
    leafMap.setView([51.505, -0.09], 13)

    return function unloadMap () {
      leafMap?.remove()
    }
  }, [])

  return (
    <div>
      <h6 style={{ margin: '0.25em', padding: 0 }}>LeafletGeoMap</h6>
      <div
        id={leafMapId}
        style={{
          width: '100%',
          height: '400px'
        }}
      ></div>
    </div>
  )
}

export default LeafletGeoMap