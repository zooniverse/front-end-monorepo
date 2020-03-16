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
  'application/ecmascript',
  'application/javascript',
  'application/xml',
  'audio/aac',
  'audio/wav',
  'image/bmp',
  'image/tiff',
  'text/css',
  'text/ecmascript',
  'text/html',
  'text/javascript'
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

    it('should return errors only for the invalid types', function () {
      let successCount = 0
      let errorCount = 0
      const allMimeTypes = validMimeTypes.concat(invalidMimeTypes)
      allMimeTypes.forEach((mimeType) => {
        try { 
          const result = validateMimeType(mimeType)
          if (result) successCount += 1
        } catch (error) {
          errorCount += 1
        }
      })
      expect(successCount).to.equal(validMimeTypes.length)
      expect(errorCount).to.equal(invalidMimeTypes.length)
    })
  })
})