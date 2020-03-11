import validateMimeType from './validateMimeType'

const validMimeTypes = [
  'application/json',
  'text/plain',
  'image/png',
  'image/jpeg',
  'image/gif',
  'audio/mp3',
  'audio/m4a',
  'audio/mpeg',
  'video/mp4',
  'video/mpeg',
  'video/x-m4v'
]

const invalidMimeTypes = [
  'application/xml',
  'audio/aac',
  'audio/wave',
  'image/tiff'
]

describe('Helpers > validateMimeType', function () {
  it('should be a function', function () {
    expect(validateMimeType).to.be.a('function')
  })

  describe('valid mime types', function () {
    it('should return true', function () {
      validMimeTypes.forEach((mimeType) => {
        expect(validateMimeType(mimeType)).to.be.true()
      })
    })
  })

  describe('invalid mime types', function () {
    it('should return an error', function () {
      invalidMimeTypes.forEach((mimeType) => {
        expect(function () { 
          validateMimeType(mimeType)
        }).to.throw(Error, `${mimeType} is not valid for use in the classifier.`)
      })
    })
  })
})