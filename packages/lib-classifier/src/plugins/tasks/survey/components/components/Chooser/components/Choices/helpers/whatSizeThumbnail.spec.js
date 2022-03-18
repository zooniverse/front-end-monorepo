import whatSizeThumbnail from './whatSizeThumbnail'

describe('Function > whatSizeThumbnail', function () {
  it('should be a function', function () {
    expect(whatSizeThumbnail).to.be.a('function')
  })

  it('should return \'none\' if the length of the array is greater than 30', function () {
    expect(whatSizeThumbnail(Array(31))).to.equal('none')
  })

  it('should return \'small\' if there are 3 columns', function () {
    expect(whatSizeThumbnail(Array(21))).to.equal('small')
  })

  it('should return \'medium\' if there are 2 columns', function () {
    expect(whatSizeThumbnail(Array(19))).to.equal('medium')
  })

  it('should return \'large\' if there is 1 column', function () {
    expect(whatSizeThumbnail(Array(4))).to.equal('large')
  })
})