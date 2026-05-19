import { unByKey } from 'ol/Observable'
import Draw from 'ol/interaction/Draw'

function createGeoLineStringInteraction({
  map,
  source,
  geoDrawingTask,
  selectInteraction
}) {
  const draw = new Draw({
    source,
    type: 'LineString'
  })

  map.addInteraction(draw)
  draw.setActive(false)

  const drawEndKey = draw.on('drawend', function handleDrawEnd(event) {
    const feature = event.feature
    if (!feature) return

    const toolIndex = geoDrawingTask?.activeToolIndex
    if (typeof toolIndex === 'number') {
      feature.set('toolIndex', toolIndex)
    }

    // Defer with a microtask so the source's addfeature event fires before
    // Select reads the new feature.
    if (selectInteraction) {
      Promise.resolve().then(() => {
        selectInteraction.getFeatures().clear()
        selectInteraction.getFeatures().push(feature)
        selectInteraction.dispatchEvent({
          type: 'select',
          selected: [feature],
          deselected: []
        })
      })
    }
  })

  return {
    setActive(active) {
      draw.setActive(active)
    },
    destroy() {
      if (drawEndKey) {
        unByKey(drawEndKey)
      }
      draw.setActive(false)
      map.removeInteraction(draw)
    }
  }
}

export default createGeoLineStringInteraction
