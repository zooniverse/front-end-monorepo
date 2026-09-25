import parseLines from './parse-lines'

describe('feedback geo parseLines', function () {
  const one = [[-91, 48], [-90.99, 48.001]]
  const two = [one, [[-91, 47.9], [-90.99, 47.9]]]

  it('should parse a single line as a list of positions', function () {
    expect(parseLines(JSON.stringify(one))).to.deep.equal(one)
  })

  it('should parse several lines as a list of lines', function () {
    expect(parseLines(JSON.stringify(two))).to.deep.equal(two)
  })

  it('should accept already-parsed input', function () {
    expect(parseLines(one)).to.deep.equal(one)
    expect(parseLines(two)).to.deep.equal(two)
  })

  it('should reject a line with fewer than two positions', function () {
    expect(parseLines('[[-91, 48]]')).to.be.undefined
    expect(parseLines(JSON.stringify([[[-91, 48]], one]))).to.be.undefined
  })

  it('should reject malformed input', function () {
    expect(parseLines('[[-91, 48], [-90.99')).to.be.undefined
    expect(parseLines('[[-91, "a"], [-90.99, 48]]')).to.be.undefined
    expect(parseLines([])).to.be.undefined
    expect(parseLines(undefined)).to.be.undefined
  })
})
