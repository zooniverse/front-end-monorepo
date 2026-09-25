import parseCoordinates from './parse-coordinates'

describe('feedback geo parseCoordinates', function () {
  it('should parse a JSON string of lon/lat pairs', function () {
    expect(parseCoordinates('[[-91, 48], [-90.99, 48.001]]', 2)).to.deep.equal([[-91, 48], [-90.99, 48.001]])
  })

  it('should accept an already-parsed array', function () {
    expect(parseCoordinates([[-91, 48], [-90.99, 48.001]], 2)).to.deep.equal([[-91, 48], [-90.99, 48.001]])
  })

  it('should reject fewer pairs than required', function () {
    expect(parseCoordinates('[[-91, 48]]', 2)).to.be.undefined
  })

  it('should reject malformed JSON and non-numeric positions', function () {
    expect(parseCoordinates('[[-91, 48], [-90.99', 2)).to.be.undefined
    expect(parseCoordinates('[[-91, "a"], [-90.99, 48]]', 2)).to.be.undefined
    expect(parseCoordinates('[[-91, 48, 0], [-90.99, 48]]', 2)).to.be.undefined
    expect(parseCoordinates(undefined, 2)).to.be.undefined
  })
})
