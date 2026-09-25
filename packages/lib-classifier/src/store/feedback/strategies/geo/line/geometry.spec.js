import geometry from './geometry'

describe('feedback geo line geometry', function () {
  const one = [[-91, 48], [-90.99, 48.001]]
  const two = [one, [[-91, 47.9], [-90.99, 47.9]]]

  it('should describe a single target as a LineString', function () {
    expect(geometry({ coordinates: one })).to.deep.equal({ type: 'LineString', coordinates: one })
  })

  it('should describe several targets as a MultiLineString', function () {
    expect(geometry({ coordinates: two })).to.deep.equal({ type: 'MultiLineString', coordinates: two })
  })
})
