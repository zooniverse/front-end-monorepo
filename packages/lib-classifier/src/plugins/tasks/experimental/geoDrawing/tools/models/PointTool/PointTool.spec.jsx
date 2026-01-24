import GeoPointTool from './PointTool'

describe('Model > GeoPointTool', function () {
  const geoPointTool = {
    label: 'Map Point',
    type: 'geoPoint',
    color: '#ff0000',
    uncertainty_circle: false
  }

  it('should exist', function () {
    const tool = GeoPointTool.create(geoPointTool)
    expect(tool).to.exist
    expect(tool).to.be.an('object')
  })

  describe('Views > geometryType', function () {
    it('should return geometryType of "Point"', function () {
      const tool = GeoPointTool.create(geoPointTool)
      expect(tool.geometryType).to.equal('Point')
    })
  })

  describe('Views > getStyles', function () {
    it('should return an array of styles', function () {
      const tool = GeoPointTool.create(geoPointTool)
      const styles = tool.getStyles({
        feature: {},
        resolution: 1,
        isSelected: false
      })
      expect(styles).to.be.an('array')
      expect(styles.length).to.be.greaterThan(0)
    })
  })

  describe('with uncertainty circle enabled', function () {
    it('should return styles including an uncertainty circle when uncertainty_radius is set', function () {
      const tool = GeoPointTool.create({
        ...geoPointTool,
        uncertainty_circle: true
      })
      const mockFeature = {
        get: (property) => {
          if (property === 'uncertainty_radius') {
            return 50 // mock uncertainty_radius value
          }
          return null
        }
      }
      const styles = tool.getStyles({
        feature: mockFeature,
        resolution: 1,
        isSelected: false
      })
      expect(styles).to.be.an('array')
      expect(styles.length).to.be.greaterThan(1) // should include uncertainty circle style
    })
  })
})
