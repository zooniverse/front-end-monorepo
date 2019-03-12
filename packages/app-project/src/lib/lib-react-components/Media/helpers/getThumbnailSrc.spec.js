import getThumbnailSrc from './getThumbnailSrc'

describe('getThumbnailSrc', function () {
  const jpeg = 'https://panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg'
  const gif = 'https://panoptes-uploads.zooniverse.org/production/workflow_attached_image/939b6e91-a853-4e67-969e-3d91f03dba3d.gif'
  const origin = 'https://thumbnails.zooniverse.org'
  it('should return a source string using the Zooniverse thumbnail service', function () {
    const returnValue = getThumbnailSrc({ origin, src: jpeg })
    expect(returnValue).to.equal(`${origin}/999x999/panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg`)
  })

  it('should use width and height if defined', function () {
    const width = 150
    const height = 100
    const returnValue = getThumbnailSrc({ height, origin, src: jpeg, width })
    expect(returnValue).to.equal(`${origin}/${width}x${height}/panoptes-uploads.zooniverse.org/production/subject_location/66094a64-8823-4314-8ef4-1ee228e49470.jpeg`)
  })

  it('should return undefined if src is not defined', function () {
    const returnValue = getThumbnailSrc({ origin })
    expect(returnValue).to.be.undefined
  })

  it('should return the original source if the source string ends in ".gif"', function () {
    const returnValue = getThumbnailSrc({ origin, src: gif })
    expect(returnValue).to.equal(gif)
  })
})