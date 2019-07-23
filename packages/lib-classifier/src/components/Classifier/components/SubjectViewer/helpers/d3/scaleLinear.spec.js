import scaleLinear from './scaleLinear'

describe('Helper > d3 > scaleLinear', function () {
  it('should be a function', function () {
    expect(scaleLinear).to.be.a('function')
  })

  it('should return a d3 linear scale', function () {
    const scale = scaleLinear({})
    expect(scale.type).to.equal('linear')
  })

  it('should set range', function () {
    const scale = scaleLinear({ range: [0, 10] })
    const range = scale.range()
    expect(range).to.have.lengthOf(2)
    expect(range[0]).to.equal(0)
    expect(range[1]).to.equal(10)
  })

  it('should set domain', function () {
    const domainToSet = [0, 10, 20]
    const scale = scaleLinear({ domain: domainToSet })
    const domain = scale.domain()
    expect(domain).to.have.lengthOf(3)
    domain.forEach((unit, index) => {
      expect(unit).to.equal(domainToSet[index])
    })
  })

  it('should nice the domain', function () {
    const scale = scaleLinear({ domain: [0.201470, 0.996679], nice: true })
    const domain = scale.domain()
    expect(domain[0]).to.equal(0.2)
    expect(domain[1]).to.equal(1)
  })

  it('should set clamp', function () {
    const scale = scaleLinear({ clamp: true })
    expect(scale.clamp()).to.be.true()
  })
})