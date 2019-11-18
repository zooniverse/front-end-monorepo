import getGradientShade from './getGradientShade'

describe('Helper > getGradientShade', function () {
  it('should be a function', function () {
    expect(getGradientShade).to.be.a('function')
  })

  it('should return the expected results', function () {
    expect(getGradientShade('#f0b200')).to.equal('#ea9300') // gold
    expect(getGradientShade('#00979d')).to.equal('#006d75') // teal
    expect(getGradientShade('#078F52')).to.equal('#046231') // green
  })
})
