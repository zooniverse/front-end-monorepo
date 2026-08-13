import getSubjectThumbnailSrc from './getSubjectThumbnailSrc'

describe('getSubjectThumbnailSrc', function () {
  const supportedSrc = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'
  const unsupportedSrc = 'https://example.com/image.jpeg'
  const origin = 'https://thumbnails.zooniverse.org'

  it('should return a source string using the thumbnail service', function () {
    const returnValue = getSubjectThumbnailSrc({ origin, src: supportedSrc, width: 100 })
    expect(returnValue).to.equal(`${origin}/100x100/panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg`)
  })

  it('should use width and height if defined', function () {
    const width = 150
    const height = 80
    const returnValue = getSubjectThumbnailSrc({ height, origin, src: supportedSrc, width })
    expect(returnValue).to.equal(`${origin}/${width}x${height}/panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg`)
  })

  it('should return null if src is not defined', function () {
    const returnValue = getSubjectThumbnailSrc({ origin })
    expect(returnValue).to.equal(null)
  })

  it('should return null for unsupported hosts', function () {
    const returnValue = getSubjectThumbnailSrc({ origin, src: unsupportedSrc })
    expect(returnValue).to.equal(null)
  })
})