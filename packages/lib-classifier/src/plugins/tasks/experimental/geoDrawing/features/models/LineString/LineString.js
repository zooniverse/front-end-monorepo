import { types } from 'mobx-state-tree'
import { Point as OLPoint } from 'ol/geom'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Circle from 'ol/style/Circle'

const DEFAULT_COLOR = '#007bff'

const LineString = types
  .model('LineString', {
    type: types.literal('Feature'),
    geometry: types.model({
      type: types.literal('LineString'),
      coordinates: types.array(types.array(types.number))
    }),
    properties: types.optional(types.frozen(), {})
  })
  .preProcessSnapshot((snapshot) => {
    const newSnapshot = Object.assign({}, snapshot, { type: 'Feature' })
    const newGeometry = newSnapshot.geometry || {}

    let coordinates = []
    if (typeof newGeometry.getType === 'function') {
      coordinates = newGeometry.getCoordinates?.() || []
    } else {
      coordinates = newGeometry.coordinates || []
    }

    newSnapshot.geometry = {
      type: newGeometry.type || newGeometry.getType?.() || 'LineString',
      coordinates: Array.isArray(coordinates) ? coordinates : []
    }

    return newSnapshot
  })
  .views(self => ({
    getCoordinates({ feature }) {
      const olCoordinates = feature?.getGeometry?.()?.getCoordinates?.()
      if (Array.isArray(olCoordinates) && olCoordinates.length > 0) return olCoordinates

      return self.geometry.coordinates
    },

    getTool({ feature, geoDrawingTask }) {
      const tools = geoDrawingTask?.tools
      if (!tools) return undefined
      const toolIndex = feature?.get?.('toolIndex')
      const indexedTool = typeof toolIndex === 'number' ? tools[toolIndex] : undefined
      return indexedTool || tools.find(tool => tool.type === 'LineString')
    },

    getStyles({
      feature,
      geoDrawingTask,
      isSelected = false
    }) {
      const tool = self.getTool({ feature, geoDrawingTask })
      const color = tool?.color || DEFAULT_COLOR

      const strokeWidth = isSelected ? 4 : 3
      const styles = []

      styles.push(
        new Style({
          stroke: new Stroke({ color, width: strokeWidth })
        })
      )

      if (isSelected) {
        const coordinates = self.getCoordinates({ feature })
        coordinates.forEach((coord) => {
          styles.push(
            new Style({
              geometry: new OLPoint(coord),
              image: new Circle({
                radius: 5,
                fill: new Fill({ color: 'white' }),
                stroke: new Stroke({ color, width: 2 })
              })
            })
          )
        })
      }

      return styles
    }
  }))

export default LineString
