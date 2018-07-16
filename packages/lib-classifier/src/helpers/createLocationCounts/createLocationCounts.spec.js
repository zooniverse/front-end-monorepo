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

function mockSubject (locations) {
  return { locations }
}

describe('Helpers > createLocationCounts', function () {
  it('should return an object', function () {
    const result1 = createLocationCounts(mockSubject(mockLocations1))
    expect(result1 !== null && typeof result1 === 'object').to.equal(true)
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
})
