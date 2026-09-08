import getPointFeatures from './get-point-features'

describe('feedback geo get-point-features', function () {
  const point = {
    type: 'Feature',
    geometry: { type: 'Point', coordinates: [-91.0, 48.0] },
    properties: {}
  }

  const lineString = {
    type: 'Feature',
    geometry: { type: 'LineString', coordinates: [[-91.0, 48.0], [-90.99, 48.01]] },
    properties: {}
  }

  it('should return the Point features of a FeatureCollection', function () {
    const features = getPointFeatures({ type: 'FeatureCollection', features: [point, lineString] })
    expect(features).to.deep.equal([point])
  })

  it('should return an empty array for an empty FeatureCollection', function () {
    expect(getPointFeatures({ type: 'FeatureCollection', features: [] })).to.deep.equal([])
  })

  it('should return an empty array for a null value', function () {
    expect(getPointFeatures(null)).to.deep.equal([])
  })
})
