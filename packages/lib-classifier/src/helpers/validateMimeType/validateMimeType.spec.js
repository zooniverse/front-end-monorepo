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
        expect(validateMimeType(mimeType)).to.equal(true)
      })
    })
  })

  describe('invalid mime types', function () {
    it('should return false', function () {
      invalidMimeTypes.forEach((mimeType) => {
        expect(validateMimeType(mimeType)).to.equal(false)
      })
    })

    it('should return false only for the invalid types', function () {
      let validCount = 0
      let invalidCount = 0
      const allMimeTypes = validMimeTypes.concat(invalidMimeTypes)
      allMimeTypes.forEach((mimeType) => {
        const result = validateMimeType(mimeType)
        if (result) {
          validCount += 1
        } else {
          invalidCount += 1
        }
      })
      expect(validCount).to.equal(validMimeTypes.length)
      expect(invalidCount).to.equal(invalidMimeTypes.length)
    })
  })
})
