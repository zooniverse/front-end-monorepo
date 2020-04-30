import validateSubjectLocations from './validateSubjectLocations'

const validSubjectLocations = [
  { 'image/png': 'https://www.foobar.org/example.png' },
  { 'image/jpeg': 'https://www.foobar.org/example.jpg' },
  { 'image/jpeg': 'https://www.foobar.org/example.jpeg' },
  { 'image/gif': 'https://www.foobar.org/example.gif' },
  { 'application/json': 'https://www.foobar.org/example.json' },
  { 'audio/mp3': 'https://www.foobar.org/example.mp3' },
  { 'audio/m4a': 'https://www.foobar.org/example.m4a' },
  { 'audio/mpeg': 'https://www.foobar.org/example.mp3' },
  { 'text/plain': 'https://www.foobar.org/example.txt' },
  { 'video/mp4': 'https://www.foobar.org/example.mp4' },
  { 'video/mpeg': 'https://www.foobar.org/example.mpeg' },
  { 'video/x-m4v': 'https://www.foobar.org/example.m4v' }
]

const invalidSubjectLocations = [
  { 'application/ecmascript': 'https://www.foobar.org/example.js' },
  { 'application/javascript': 'https://www.foobar.org/example.js' },
  { 'application/xml': 'https://www.foobar.org/example.xml' },
  { 'audio/aac': 'https://www.foobar.org/example.aac' },
  { 'audio/wav': 'https://www.foobar.org/example.wav' },
  { 'image/bmp': 'https://www.foobar.org/example.bmp' },
  { 'image/tiff': 'https://www.foobar.org/example.tif' },
  { 'text/css': 'https://www.foobar.org/example.css' },
  { 'text/ecmascript': 'https://www.foobar.org/example.js' },
  { 'text/html': 'https://www.foobar.org/example.html' },
  { 'text/javascript': 'https://www.foobar.org/example.js' }
]

const misMatchedLocation = [
  { 'image/png': 'https://www.foobar.org/example.js' } // Example of purposeful mismatch of mimetype and file ext
]

describe('Helpers > validateSubjectLocations', function () {
  it('should be a function', function () {
    expect(validateSubjectLocations).to.be.a('function')
  })

  describe('valid subject locations', function () {
    it('should return true', function () {
      expect(validateSubjectLocations(validSubjectLocations)).to.be.true()
    })
  })

  describe('invalid subject locations', function () {
    it('should return false', function () {
      expect(validateSubjectLocations(invalidSubjectLocations)).to.be.false()
    })

    it('should return false if any one of the locations is invalid', function () {
      const allLocations = validSubjectLocations.concat(invalidSubjectLocations)
      expect(validateSubjectLocations(allLocations)).to.be.false()
    })

    it('should return false if the location mismatched mimetype and file extension', function () {
      expect(validateSubjectLocations(misMatchedLocation)).to.be.false()
    })
  })
})