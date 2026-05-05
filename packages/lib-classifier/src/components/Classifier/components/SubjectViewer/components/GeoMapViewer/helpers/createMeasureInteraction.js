import { unByKey } from 'ol/Observable'
import LineString from 'ol/geom/LineString'
import Draw from 'ol/interaction/Draw'
import VectorLayer from 'ol/layer/Vector'
import VectorSource from 'ol/source/Vector'
import { getLength } from 'ol/sphere'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Style from 'ol/style/Style'
import Overlay from 'ol/Overlay'

import UNIT_CONVERSIONS from '@helpers/unitConversions'

const drawStyle = new Style({
  fill: new Fill({
    color: 'rgba(255, 255, 255, 0.2)'
  }),
  image: new CircleStyle({
    radius: 5,
    stroke: new Stroke({
      color: 'rgba(0, 0, 0, 0.7)'
    }),
    fill: new Fill({
      color: 'rgba(255, 255, 255, 0.2)'
    })
  }),
  stroke: new Stroke({
    color: '#ffcc33',
    lineDash: [10, 10],
    width: 2
  })
})

function formatLength(line, unit = 'meters') {
  const meters = getLength(line)
  const { factor, label } = UNIT_CONVERSIONS[unit] ?? UNIT_CONVERSIONS.meters
  const value = Math.round(meters * factor * 100) / 100
  return `${value.toLocaleString()} ${label}`
}

function createOverlayElement(className) {
  const element = document.createElement('div')
  element.className = className
  return element
}

function createMeasureInteraction({ map, messages = {} }) {
  const source = new VectorSource()
  const layer = new VectorLayer({
    source,
    style: drawStyle,
    zIndex: 2
  })

  const draw = new Draw({
    source,
    type: 'LineString',
    style(feature) {
      const geometryType = feature.getGeometry()?.getType()

      if (geometryType === 'LineString' || geometryType === 'Point') {
        return drawStyle
      }

      return undefined
    }
  })

  const state = {
    active: false,
    helpTooltip: null,
    helpTooltipElement: null,
    measureTooltip: null,
    measureTooltipElement: null,
    sketch: null,
    sketchListenerKey: null,
    staticTooltipEntries: [],
    unit: 'meters'
  }

  map.addLayer(layer)
  map.addInteraction(draw)
  draw.setActive(false)

  function removeTooltipEntry(entry) {
    if (!entry) return

    if (entry.overlay) {
      map.removeOverlay(entry.overlay)
    }

    if (entry.element?.parentNode) {
      entry.element.remove()
    }
  }

  function createHelpTooltip() {
    removeTooltipEntry({
      overlay: state.helpTooltip,
      element: state.helpTooltipElement
    })

    state.helpTooltipElement = createOverlayElement('ol-measure-tooltip hidden')
    state.helpTooltip = new Overlay({
      element: state.helpTooltipElement,
      offset: [15, 0],
      positioning: 'center-left'
    })

    map.addOverlay(state.helpTooltip)
  }

  function createActiveMeasureTooltip() {
    removeTooltipEntry({
      overlay: state.measureTooltip,
      element: state.measureTooltipElement
    })

    state.measureTooltipElement = createOverlayElement('ol-measure-tooltip ol-measure-tooltip-measure hidden')
    state.measureTooltip = new Overlay({
      element: state.measureTooltipElement,
      offset: [0, -15],
      positioning: 'bottom-center',
      stopEvent: false,
      insertFirst: false
    })

    map.addOverlay(state.measureTooltip)
  }

  function clearTransientTooltipEntries() {
    removeTooltipEntry({
      overlay: state.helpTooltip,
      element: state.helpTooltipElement
    })
    removeTooltipEntry({
      overlay: state.measureTooltip,
      element: state.measureTooltipElement
    })

    state.helpTooltip = null
    state.helpTooltipElement = null
    state.measureTooltip = null
    state.measureTooltipElement = null
  }

  function clearStaticTooltipEntries() {
    state.staticTooltipEntries.forEach(removeTooltipEntry)
    state.staticTooltipEntries = []
  }

  function clearSketchState() {
    if (state.sketchListenerKey) {
      unByKey(state.sketchListenerKey)
      state.sketchListenerKey = null
    }

    state.sketch = null
  }

  function clearMeasurement() {
    draw.abortDrawing?.()
    source.clear()
    clearSketchState()
    clearTransientTooltipEntries()
    clearStaticTooltipEntries()

    if (state.active) {
      createHelpTooltip()
      createActiveMeasureTooltip()
    }
  }

  function deactivateMeasurement() {
    draw.abortDrawing?.()
    clearSketchState()
    clearTransientTooltipEntries()
  }

  function handlePointerMove(event) {
    if (!state.active || event.dragging || !state.helpTooltipElement) {
      return
    }

    const helpMessage = state.sketch
      ? (messages.clickToContinue ?? 'Click to continue measuring')
      : (messages.clickToStart ?? 'Click to start measuring')

    state.helpTooltipElement.innerHTML = helpMessage
    state.helpTooltip.setPosition(event.coordinate)
    state.helpTooltipElement.classList.remove('hidden')
  }

  function handleViewportMouseOut() {
    if (state.helpTooltipElement) {
      state.helpTooltipElement.classList.add('hidden')
    }
  }

  map.on('pointermove', handlePointerMove)
  const viewport = map.getViewport()
  viewport.addEventListener('mouseout', handleViewportMouseOut)

  draw.on('drawstart', function handleDrawStart(event) {
    source.clear()
    clearStaticTooltipEntries()
    clearSketchState()
    clearTransientTooltipEntries()
    createHelpTooltip()
    createActiveMeasureTooltip()

    state.sketch = event.feature

    if (state.sketchListenerKey) {
      unByKey(state.sketchListenerKey)
    }

    state.sketchListenerKey = state.sketch.getGeometry().on('change', function handleSketchChange(changeEvent) {
      const geometry = changeEvent.target

      if (!(geometry instanceof LineString) || !state.measureTooltipElement) {
        return
      }

      state.measureTooltipElement.innerHTML = formatLength(geometry, state.unit)
      state.measureTooltipElement.classList.remove('hidden')
      state.measureTooltip.setPosition(geometry.getLastCoordinate())
    })
  })

  draw.on('drawend', function handleDrawEnd(event) {
    if (state.measureTooltip && state.measureTooltipElement) {
      state.measureTooltipElement.className = 'ol-measure-tooltip ol-measure-tooltip-static'
      state.measureTooltip.setOffset([0, -7])
      const completedGeometry = event.feature?.getGeometry()?.clone()
      state.staticTooltipEntries.push({
        overlay: state.measureTooltip,
        element: state.measureTooltipElement,
        geometry: completedGeometry
      })
    }

    if (state.sketchListenerKey) {
      unByKey(state.sketchListenerKey)
      state.sketchListenerKey = null
    }

    state.sketch = null
    state.measureTooltip = null
    state.measureTooltipElement = null

    if (state.active) {
      createActiveMeasureTooltip()
    }
  })

  return {
    clear: clearMeasurement,
    destroy() {
      state.active = false
      draw.setActive(false)
      clearMeasurement()
      map.removeInteraction(draw)
      map.removeLayer(layer)
      map.un('pointermove', handlePointerMove)
      viewport.removeEventListener('mouseout', handleViewportMouseOut)
    },
    setActive(active) {
      state.active = active
      draw.setActive(active)

      if (active) {
        createHelpTooltip()
        createActiveMeasureTooltip()
        return
      }

      deactivateMeasurement()
    },
    setUnit(unit) {
      state.unit = unit
      state.staticTooltipEntries.forEach(function updateStaticTooltip({ element, geometry }) {
        if (element && geometry) {
          element.innerHTML = formatLength(geometry, unit)
        }
      })
    }
  }
}

export default createMeasureInteraction