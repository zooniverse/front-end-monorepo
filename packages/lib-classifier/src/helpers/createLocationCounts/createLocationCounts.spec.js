import createLocationCounts from './createLocationCounts'

const mockLocations1 = [
  { 'image/jpeg': 'http://foobar.com/image1.jpeg' }
]

const mockLocations2 = [
  { 'image/jpeg': 'http://foobar.com/image1.jpeg' },
  { 'image/jpeg': 'http://foobar.com/image2.jpeg' }
]

const mockLocations3 = [
  { 'image/jpeg': 'http://foobar.com/image1.jpeg' },
  { 'image/jpeg': 'http://foobar.com/image2.jpeg' },
  { 'audio/wav': 'http://foobar.com/audio1.wav' }
]

const mockLocations4 = [
  { 'image/jpeg': 'http://foobar.com/image1.jpeg' },
  { 'application/json': 'http://foobar.com/data.json' }
]

const mockLocations5 = [
  { 'image/tiff': 'http://foobar.com/image1.tiff' }
]

const mockLocations6 = [
  { 'text/plain': 'http://foobar.com/text1.txt' }
]

function mockSubject (locations) {
  return { locations }
}

describe('Helpers > createLocationCounts', function () {
  describe('when the mime types are valid', function () {
    it('should return an object', function () {
      const result1 = createLocationCounts(mockSubject(mockLocations1))
      expect(result1 !== null && typeof result1 === 'object').to.be.true()
    })

    it('should return a total location count', function () {
      const result1 = createLocationCounts(mockSubject(mockLocations1))
      const result2 = createLocationCounts(mockSubject(mockLocations2))

      expect(result1.total).to.equal(1)
      expect(result2.total).to.equal(2)
    })

    it('should return the number of images', function () {
      const result2 = createLocationCounts(mockSubject(mockLocations2))
      const result3 = createLocationCounts(mockSubject(mockLocations3))

      expect(result2.images).to.equal(2)
      expect(result3.images).to.equal(2)
    })

    it('should return the number of json files', function () {
      const result4 = createLocationCounts(mockSubject(mockLocations4))

      expect(result4.json).to.equal(1)
    })

    it('should return the number of text files', function () {
      const result6 = createLocationCounts(mockSubject(mockLocations6))

      expect(result6.text).to.equal(1)
    })
  })

  describe('when the mime types are invalid', function () {
    it('should return 0 locations', function () {
      const return5 = createLocationCounts(mockSubject(mockLocations5))
      expect(return5.images).to.equal(0)
      expect(return5.json).to.equal(0)
    })
  })
})
