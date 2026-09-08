import localMeters from './local-meters'

describe('feedback geo local-meters', function () {
  it('should convert northward offsets at ~111320 meters per degree', function () {
    const { dx, dy } = localMeters(-91.0, 48.01, -91.0, 48.0)
    expect(dx).to.equal(0)
    expect(dy).to.be.closeTo(1113.2, 0.1)
  })

  it('should shrink eastward offsets by cos(latitude)', function () {
    const { dx } = localMeters(-90.98, 48.0, -91.0, 48.0)
    expect(dx).to.be.closeTo(0.02 * 111320 * Math.cos((48.0 * Math.PI) / 180), 0.1)
  })

  it('should measure across the antimeridian by the short way round', function () {
    const { dx } = localMeters(-179.99, 0, 179.99, 0)
    expect(dx).to.be.closeTo(0.02 * 111320, 0.1)
  })

  it('should keep sign pointing east and north', function () {
    const { dx, dy } = localMeters(-91.02, 47.99, -91.0, 48.0)
    expect(dx).to.be.below(0)
    expect(dy).to.be.below(0)
  })
})
