import Feature from 'ol/Feature'
import { LineString, Point, Polygon } from 'ol/geom'

import getFeatureStyle from './getFeatureStyle'

describe('helpers > getFeatureStyle', function () {
  it('should outline a Polygon the subject provides, with no fill over the imagery', function () {
    const feature = new Feature({
      geometry: new Polygon([[[0, 0], [1000, 0], [1000, 1000], [0, 1000], [0, 0]]])
    })
    const style = getFeatureStyle({ feature, geoDrawingTask: null, isSelected: false })
    expect(style).to.not.equal(null)
    expect(style.getStroke()).to.not.equal(null)
    expect(style.getFill()).to.equal(null)
  })

  it('should still delegate drawable geometries to their mark models', function () {
    const point = new Feature({ geometry: new Point([1, 2]) })
    const line = new Feature({ geometry: new LineString([[0, 0], [10, 10]]) })
    expect(getFeatureStyle({ feature: point, geoDrawingTask: null, isSelected: false })).to.be.an('array')
    expect(getFeatureStyle({ feature: line, geoDrawingTask: null, isSelected: false })).to.be.an('array')
  })

  it('should return null when there is no geometry to draw', function () {
    expect(getFeatureStyle({ feature: new Feature({}), geoDrawingTask: null, isSelected: false })).to.equal(null)
  })
})
