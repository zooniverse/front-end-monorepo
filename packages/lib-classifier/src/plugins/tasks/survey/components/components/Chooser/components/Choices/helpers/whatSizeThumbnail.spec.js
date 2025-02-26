import whatSizeThumbnail from './whatSizeThumbnail'

describe('Function > whatSizeThumbnail', function () {
  it('should be a function', function () {
    expect(whatSizeThumbnail).to.be.a('function')
  })

  describe('with default thumbnailSetting', function () {
    it('should return \'none\' if the length is greater than 30', function () {
      expect(whatSizeThumbnail({ length: 31 })).to.equal('none')
    })

    it('should return \'small\' if there are 3 columns', function () {
      expect(whatSizeThumbnail({ length: 21 })).to.equal('small')
    })

    it('should return \'large\' if there are 2 columns', function () {
      expect(whatSizeThumbnail({ length: 19 })).to.equal('large')
    })

    it('should return \'large\' if there is 1 column', function () {
      expect(whatSizeThumbnail({ length: 4 })).to.equal('large')
    })
  })

  describe('with thumbnailSetting: "show"', function () {
    it('should return \'small\' for 3 columns', function () {
      expect(whatSizeThumbnail({ length: 21, thumbnailSetting: 'show' })).to.equal('small')
    })

    it('should return \'large\' for 2 columns', function () {
      expect(whatSizeThumbnail({ length: 19, thumbnailSetting: 'show' })).to.equal('large')
    })

    it('should return \'large\' for 1 column', function () {
      expect(whatSizeThumbnail({ length: 4, thumbnailSetting: 'show' })).to.equal('large')
    })
  })

  describe('with thumbnailSetting: "hide"', function () {
    it('should always return \'none\'', function () {
      expect(whatSizeThumbnail({ length: 4, thumbnailSetting: 'hide' })).to.equal('none')
      expect(whatSizeThumbnail({ length: 19, thumbnailSetting: 'hide' })).to.equal('none')
      expect(whatSizeThumbnail({ length: 31, thumbnailSetting: 'hide' })).to.equal('none')
    })
  })
})