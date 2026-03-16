import { types } from 'mobx-state-tree'
import { Point as OLPoint } from 'ol/geom'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Circle from 'ol/style/Circle'
import { getDragHandleIcon } from './dragHandle'

const DEFAULT_COLOR = '#007bff'

const Point = types
  .model('Point', {
    type: types.literal('Feature'),
    geometry: types.model({
      type: types.literal('Point'),
      coordinates: types.array(types.number)
    }),
    properties: types.optional(types.model({
      uncertainty_radius: types.maybeNull(types.number)
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
    getCenterCoordinates({ feature }) {
      // OL feature geometry is primary (source of truth for map state)
      const olCenter = feature?.getGeometry?.()?.getCoordinates?.()
      if (Array.isArray(olCenter) && olCenter.length >= 2) return olCenter
      
      // MST model geometry as fallback (used at initialization)
      return self.geometry.coordinates
    },

    getDragHandleCoordinates({ feature, geoDrawingTask }) {
      const radius = self.getUncertaintyRadius({ feature, geoDrawingTask })
      if (radius === null || radius === undefined) {
        return undefined
      }
      const center = self.getCenterCoordinates({ feature })
      if (!Array.isArray(center) || center.length < 2) {
        return undefined
      }
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

      const styles = []

      const uncertaintyRadiusPixels = self.getUncertaintyRadiusPixels({ feature, geoDrawingTask, resolution })
      const hasVisibleUncertaintyHandle = uncertaintyRadiusPixels !== undefined

      if (hasVisibleUncertaintyHandle && uncertaintyRadiusPixels > 0) {
        styles.push(
          new Style({
            image: new Circle({
              radius: uncertaintyRadiusPixels,
              stroke: new Stroke({ color, width: 2, lineDash: [5, 10] })
            })
          })
        )

      }

      if (isSelected && hasVisibleUncertaintyHandle) {
        const dragHandleCoordinates = self.getDragHandleCoordinates({ feature, geoDrawingTask })
        if (dragHandleCoordinates) {
          styles.push(
            new Style({
              geometry: new OLPoint(dragHandleCoordinates),
              image: getDragHandleIcon(color)
            })
          )
        }
      }

      // Draw the point last so it stays above uncertainty overlays and handles.
      styles.push(
        new Style({
          image: new Circle({
            radius: pointRadius,
            fill: new Fill({ color }),
            stroke: new Stroke({ color: strokeColor, width: strokeWidth })
          })
        })
      )

      return styles
    },

    getUncertaintyRadius({ feature, geoDrawingTask }) {
      // Returns radius in map coordinate units (or null if explicitly disabled)
      const tool = self.getTool({ feature, geoDrawingTask })
      if (tool?.uncertainty_circle === true) {
        // Check OL feature first, then MST properties
        const olRadius = feature?.get?.('uncertainty_radius')
        if (olRadius !== undefined) {
          return olRadius  // Could be null (disabled), 0 (zero radius), or number
        }
        const mstRadius = self.properties?.uncertainty_radius
        return mstRadius  // Could be null (disabled), 0 (zero radius), number, or undefined
      }
      return null  // Tool doesn't support uncertainty circles
    },

    getUncertaintyRadiusPixels({ feature, geoDrawingTask, resolution }) {
      if (!resolution) return undefined
      const radiusCoords = self.getUncertaintyRadius({ feature, geoDrawingTask })
      if (radiusCoords === null || radiusCoords === undefined) return undefined
      return (radiusCoords / resolution)
    }
  }))

export default Point
