import { types } from 'mobx-state-tree'
import Style from 'ol/style/Style'
import Fill from 'ol/style/Fill'
import Stroke from 'ol/style/Stroke'
import Circle from 'ol/style/Circle'

const DEFAULT_COLOR = '#007bff'

const GeoPointTool = types.model('GeoPointTool', {
  color: types.optional(types.string, ''),
  label: types.optional(types.string, ''),
  type: types.literal('geoPoint'),
  uncertainty_circle: types.optional(types.boolean, false)
})
  .views(self => ({
    get geometryType() {
      return 'Point'
    },
    getStyles(feature, resolution, isSelected = false) {
      const color = self.color || DEFAULT_COLOR
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

      // Uncertainty circle (if radius exists and not selected)
      if (!isSelected && self.uncertainty_circle) {
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

export default GeoPointTool
