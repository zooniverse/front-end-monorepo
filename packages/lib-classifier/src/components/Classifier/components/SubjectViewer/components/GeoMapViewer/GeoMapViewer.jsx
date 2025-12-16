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
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style'
import Control from 'ol/control/Control'

const MapContainer = styled.div`
  height: 100%;
  min-height: 400px;
  width: 100%;
`

function GeoMapViewer({
  geoJSON = undefined
}) {
  const mapRef = useRef()
  const selectRef = useRef()
  const translateRef = useRef()
  const initialViewRef = useRef()
  const recenterControlRef = useRef()

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
        source: vectorSource,
        style: new Style({
          image: new CircleStyle({
            radius: 10,
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.4)'
            }),
            stroke: new Stroke({
              color: '#3399CC',
              width: 2
            })
          })
        })
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

      // Fit the view to all features so everything starts visible
      if (vectorSource.getFeatures().length) {
        const view = map.getView()
        view.fit(vectorSource.getExtent(), {
          padding: [32, 32, 32, 32],
          maxZoom: 12,
        })
        // Capture initial view AFTER the fit animation completes
        map.once('moveend', () => {
          const v = map.getView()
          initialViewRef.current = {
            center: (v.getCenter() || [0, 0]).slice(),
            zoom: v.getZoom() ?? 0,
            resolution: v.getResolution() ?? undefined,
            rotation: v.getRotation() ?? 0
          }
        })
      } else {
        // No features: capture the default initial view immediately
        const v = map.getView()
        initialViewRef.current = {
          center: (v.getCenter() || [0, 0]).slice(),
          zoom: v.getZoom() ?? 0,
          resolution: v.getResolution() ?? undefined,
          rotation: v.getRotation() ?? 0
        }
      }

      const select = new Select({
        condition: click,
        layers: [vectorLayer],
        style: new Style({
          image: new CircleStyle({
            radius: 10,
            fill: new Fill({
              color: 'rgba(255, 255, 255, 0.6)'
            }),
            stroke: new Stroke({
              color: '#FF0000',
              width: 2
            })
          })
        })
      })

      const translate = new Translate({
        features: select.getFeatures()
      })

      map.addInteraction(select)
      map.addInteraction(translate)

      selectRef.current = select
      translateRef.current = translate

      // Add a custom control to recenter the map to the initial view
      const button = document.createElement('button')
      button.type = 'button'
      button.title = 'Reset to data'
      button.setAttribute('aria-label', 'Reset to data')
      button.innerHTML = '⟲'

      const element = document.createElement('div')
      element.className = 'ol-unselectable ol-control'
      element.appendChild(button)

      const onRecenterClick = (event) => {
        event.preventDefault()
        const view = map.getView()
        view.cancelAnimations()
        const features = vectorSource.getFeatures()
        if (features.length) {
          view.fit(vectorSource.getExtent(), {
            padding: [32, 32, 32, 32],
            maxZoom: 12,
            duration: 250
          })
        } else {
          const init = initialViewRef.current
          if (!init) return
          const animateProps = {
            center: init.center,
            duration: 250
          }
          if (typeof init.resolution === 'number') {
            animateProps.resolution = init.resolution
          } else if (typeof init.zoom === 'number') {
            animateProps.zoom = init.zoom
          }
          if (typeof init.rotation === 'number') {
            animateProps.rotation = init.rotation
          }
          view.animate(animateProps)
        }
      }
      button.addEventListener('click', onRecenterClick)

      const recenterControl = new Control({ element })
      map.addControl(recenterControl)

      // Position the recenter control under the zoom buttons
      try {
        const targetEl = map.getTargetElement()
        const zoomEl = targetEl?.querySelector('.ol-zoom')
        if (zoomEl && element?.style) {
          const top = (zoomEl.offsetTop || 0) + (zoomEl.offsetHeight || 0) + 8 // 8px gap
          const left = zoomEl.offsetLeft || 0
          element.style.top = `${top}px`
          element.style.left = `${left}px`
          element.style.position = 'absolute'
        }
      } catch (_) {
        // noop: fall back to default positioning
      }

      recenterControlRef.current = {
        control: recenterControl,
        button,
        onRecenterClick
      }

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
        if (recenterControlRef.current) {
          try {
            recenterControlRef.current.button.removeEventListener('click', recenterControlRef.current.onRecenterClick)
          } catch (_) {}
          try {
            mapInstance.removeControl(recenterControlRef.current.control)
          } catch (_) {}
          recenterControlRef.current = undefined
        }
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
