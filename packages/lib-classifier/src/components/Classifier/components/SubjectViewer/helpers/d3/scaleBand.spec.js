import scaleBand from './scaleBand'

describe('Helper > d3 > scaleBand', function () {
  it('should be a function', function () {
    expect(scaleBand).to.be.a('function')
  })

  it('should return a d3 band scale', function () {
    const scale = scaleBand({})
    expect(scale.type).to.equal('band')
  })

  it('should set range', function () {
    const scale = scaleBand({ range: [0, 10] })
    const range = scale.range()
    expect(range).to.have.lengthOf(2)
    expect(range[0]).to.equal(0)
    expect(range[1]).to.equal(10)
  })

  it('should set range and enable rounding', function () {
    const scale = scaleBand({ rangeRound: [0, 10] })
    const range = scale.range()
    expect(range).to.have.lengthOf(2)
    expect(range[0]).to.equal(0)
    expect(range[1]).to.equal(10)
    expect(scale.round()).to.be.true()
  })

  it('should set domain', function () {
    const domainToSet = ['A', 'B', 'C']
    const scale = scaleBand({ domain: domainToSet })
    const domain = scale.domain()
    expect(domain).to.have.lengthOf(3)
    domain.forEach((unit, index) => {
      expect(unit).to.equal(domainToSet[index])
    })
  })

  it('should set padding', function () {
    const paddingToSet = 0.5
    const scale = scaleBand({ padding: paddingToSet })
    const padding = scale.padding()
    expect(padding).to.equal(paddingToSet)
  })

  it('should set paddingInner', function () {
    const paddingToSet = 0.5
    const scale = scaleBand({ paddingInner: paddingToSet })
    const paddingInner = scale.paddingInner()
    expect(paddingInner).to.equal(paddingToSet)
  })

  it('should set paddingOuter', function () {
    const paddingToSet = 0.5
    const scale = scaleBand({ paddingOuter: paddingToSet })
    const paddingOuter = scale.paddingOuter()
    expect(paddingOuter).to.equal(paddingToSet)
  })

  it('should set align', function () {
    const alignToSet = 0.25
    const scale = scaleBand({ align: alignToSet })
    const align = scale.align()
    expect(align).to.equal(alignToSet)
  })
})