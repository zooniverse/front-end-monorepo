import { types } from 'mobx-state-tree'
import { Point as OLPoint } from 'ol/geom'
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
    getDragHandleCoordinates({ feature, geoDrawingTask }) {
      const radius = self.getUncertaintyRadiusMeters({ feature, geoDrawingTask })
      if (radius === null || radius === undefined) return undefined
      const center = feature?.getGeometry?.()?.getCoordinates?.() || self.geometry.coordinates
      if (!Array.isArray(center) || center.length < 2) return undefined
      return [center[0] + radius, center[1]]
    },

    getTool({ feature, geoDrawingTask }) {
      const tools = geoDrawingTask?.tools
      if (!tools) return undefined
      const toolIndex = feature?.get?.('toolIndex')
      const indexedTool = typeof toolIndex === 'number' ? tools[toolIndex] : undefined
      return indexedTool || tools.find(tool => tool.type === 'Point')
    },

    getStyles({
      feature,
      geoDrawingTask,
      resolution,
      isSelected = false 
    }) {
      const tool = self.getTool({ feature, geoDrawingTask })

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

      const uncertaintyRadiusPixels = self.getUncertaintyRadiusPixels({ feature, geoDrawingTask, resolution })
      if (uncertaintyRadiusPixels) {
        styles.push(
          new Style({
            image: new Circle({
              radius: uncertaintyRadiusPixels,
              stroke: new Stroke({ color, width: 2, lineDash: [5, 10] })
            })
          })
        )

        // Add drag handle on the right edge of uncertainty circle when selected
        if (isSelected) {
          const dragHandleCoordinates = self.getDragHandleCoordinates({ feature, geoDrawingTask })
          if (dragHandleCoordinates) {
            styles.push(
              new Style({
                geometry: new OLPoint(dragHandleCoordinates),
                image: new Circle({
                  radius: 6,
                  fill: new Fill({ color }),
                  stroke: new Stroke({ color: 'white', width: 2 })
                })
              })
            )
          }
        }
      }

      return styles
    },

    getUncertaintyRadiusMeters({ feature, geoDrawingTask }) {
      const tool = self.getTool({ feature, geoDrawingTask })
      if (tool?.uncertainty_circle === true) {
        return feature?.get?.('uncertainty_radius') ?? self.properties?.uncertainty_radius
      }
      return null
    },

    getUncertaintyRadiusPixels({ feature, geoDrawingTask, resolution }) {
      if (!resolution) return undefined
      const radiusMeters = self.getUncertaintyRadiusMeters({ feature, geoDrawingTask })
      if (radiusMeters === null || radiusMeters === undefined) return undefined
      return (radiusMeters / resolution) 
    }
  }))

export default Point
