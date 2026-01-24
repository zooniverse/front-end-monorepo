import { types } from 'mobx-state-tree'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Circle from 'ol/style/Circle'

const DEFAULT_COLOR = '#007bff'

const Point = types
  .model('Point', {
    type: types.literal('Feature'),
    geometry: types.model({
      type: types.literal('Point'),
      coordinates: types.array(types.number)
    }),
    properties: types.optional(types.model({
      uncertainty_radius: types.maybe(types.number)
    }), {})
  })
  .preProcessSnapshot((snapshot) => {
    const newSnapshot = Object.assign({}, snapshot, { type: 'Feature' })
    const newGeometry = newSnapshot.geometry || {}

    // Extract coordinates: handle OL Geometry or plain object
    let coordinates = []
    if (typeof newGeometry.getType === 'function') {
      coordinates = newGeometry.getCoordinates?.() || []
    } else {
      coordinates = newGeometry.coordinates || []
    }

    newSnapshot.geometry = {
      type: newGeometry.type || newGeometry.getType?.() || 'Point',
      coordinates: Array.isArray(coordinates) ? coordinates : []
    }

    return newSnapshot
  })
  .views(self => ({
    getStyles({
      feature,
      geoDrawingTask,
      resolution,
      isSelected = false 
    }) {
      const tool = geoDrawingTask?.tools?.[feature.get('toolIndex')] || geoDrawingTask?.tools?.find(tool => tool.type === 'Point')

      const color = tool?.color || DEFAULT_COLOR
      const pointRadius = isSelected ? 8 : 6
      const strokeWidth = isSelected ? 3 : 2
      const strokeColor = isSelected ? 'white' : color

      const styles = [
        new Style({
          image: new Circle({
            radius: pointRadius,
            fill: new Fill({ color }),
            stroke: new Stroke({ color: strokeColor, width: strokeWidth })
          })
        })
      ]

      const showUncertaintyCircle = tool?.uncertainty_circle === true
      if (showUncertaintyCircle) {
        const radius = feature.get('uncertainty_radius')
        if (radius !== null && radius !== undefined) {
          const radiusInPixels = radius / resolution
          styles.push(
            new Style({
              image: new Circle({
                radius: radiusInPixels,
                stroke: new Stroke({ color, width: 2, lineDash: [5, 10] })
              })
            })
          )
        }
      }

      return styles
    }
  }))

export default Point
