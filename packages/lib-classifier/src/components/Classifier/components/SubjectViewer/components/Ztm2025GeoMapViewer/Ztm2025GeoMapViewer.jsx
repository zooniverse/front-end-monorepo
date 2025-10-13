import { useState } from 'react'
import LeafletGeoMap from './LeafletGeoMap'
import OpenLayersGeoMap from './OpenLayersGeoMap'

function Ztm2025GeoMapViewer (props) {
  const [mapLibrary, setMapLibrary] = useState('openlayers')

  function selectMapLibrary (e) {
    setMapLibrary(e?.currentTarget?.dataset.maplib)
  }

  return (
    <div>
      <h5 style={{ margin: '0.5em', padding: 0 }}>Ztm2025GeoMapViewer</h5>
      <div style={{ display: 'flex' }}>
        <button onClick={selectMapLibrary} data-maplib='leaflet'>Leaflet</button>
        <button onClick={selectMapLibrary} data-maplib='openlayers'>OpenLayers</button>
      </div>
      {mapLibrary === 'leaflet' && <LeafletGeoMap />}
      {mapLibrary === 'openlayers' && <OpenLayersGeoMap />}
    </div>
  )
}

export default Ztm2025GeoMapViewer