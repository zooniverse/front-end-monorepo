import { useEffect, useId } from 'react'
import 'ol/ol.css'  // this automatically inserts additional CSS into the rendered document's <style>
import OLMap from 'ol/Map.js'
import OpenStreetMaps from 'ol/source/OSM.js'
import TileLayer from 'ol/layer/Tile.js'
import View from 'ol/View.js'

function OpenLayersGeoMap (props) {
  const olMapId = useId()
  let olMap = undefined

  // Projections??
  // --------------------------------
  // When the map loads, we want to look at the Denys Wilkinson Building, in
  // the University of Oxford.
  // Challenge: we need to decide which projection we want to use.

  // By default, OpenLayers uses the Web Mercator (EPSG:3857) projection.
  // Pro: the standard used by most web mapping apps, e.g. Google Maps.
  //      Map looks nice.
  // Con: matching web mercator coordinate to GPS coodinates is wonky. For
  //      example, DWB's 51.7595ºN, 1.2595ºW had to be manually guesstimated
  //      to 6756800, -140200 to get this example to work.
  const webMercatorView = new View({
    center: [-140200, 6756800],  // longitude (West is negative, East is positive), latitude (South is negative, North is positive)
    zoom: 18,
  })

  // GPS coordinates use the WGS84 (aka EPSG:4326) projection.
  // Pro: much easier to use GPS coordinates.
  // Con: map looks preeetty stretched out when viewing more northern/southern locations.
  const wgs84View = new View({
    center: [-1.2595, 51.7595], // 51.7595ºN, 1.2595ºW
    projection: 'EPSG:4326',
    zoom: 18,
  })

  // Render the map!
  // --------------------------------

  useEffect(function loadMap () {
    // Init map
    olMap = new OLMap({ target: olMapId })

    // Set map tiles
    const osmSource = new OpenStreetMaps()
    const osmLayer = new TileLayer({source: osmSource})
    olMap.addLayer(osmLayer)

    // Set view on map
    olMap.setView(webMercatorView)

    return function unloadMap () {
      olMap?.setTarget(undefined)
    }
  }, [])

  // --------------------------------

  function selectProjection (e) {
    const projection = e?.currentTarget.dataset.projection

    switch (projection) {
      case 'webMercator':
        olMap?.setView(webMercatorView)
        break

      case 'wgs84':
        olMap?.setView(wgs84View)
        break
    }
    
  }

  return (
    <div>
      <h6 style={{ margin: '0.25em', padding: 0 }}>OpenLayersGeoMap</h6>
      <div style={{ display: 'flex' }}>
        <b>Projection:</b>
        <button onClick={selectProjection} data-projection="webMercator">Web Mercator (default)</button>
        <button onClick={selectProjection} data-projection="wgs84">WGS84 (GPS)</button>
      </div>
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