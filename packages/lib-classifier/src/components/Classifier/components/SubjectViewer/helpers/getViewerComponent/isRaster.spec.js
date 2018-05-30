import isRaster from './isRaster'

const rasters = [
  'image/jpg',
  'image/jpeg',
  'image/png'
]

const nonRasters = [
  'image/svg+xml',
  'text/plain'
]

describe('isRaster helper', function () {
  it('should return true for raster mime types', function () {
    rasters.map(function (raster) {
      isRaster(raster).should.equal(true)
    })
  })

  it('should return false for non-raster mime types', function () {
    nonRasters.map(function (nonRaster) {
      isRaster(nonRaster).should.equal(false)
    })
  })
})
