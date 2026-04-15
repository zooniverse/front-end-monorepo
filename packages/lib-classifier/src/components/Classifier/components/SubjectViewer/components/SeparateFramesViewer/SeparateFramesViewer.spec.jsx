import { render, screen } from '@testing-library/react'
import Meta, { OneColumnImagesOnly, OneColumnImagesAndVideos } from './SeparateFramesViewer.stories'
import { composeStory } from '@storybook/react'

describe('Component > SeparateFramesViewer', function () {

  describe('with images only', function () {
    const OneColumnImagesOnlyStory = composeStory(OneColumnImagesOnly, Meta)

    it('should display an image element for each frame', async function () {
      const { container } = render(<OneColumnImagesOnlyStory />)
      const imageElements = container.querySelectorAll('image')
      expect(imageElements.length).to.equal(4) // mockSubject.locations.length
    })

    it('should display an image toolbar for each frame', function () {
      render(<OneColumnImagesOnlyStory />)
      const zoomInBtns = screen.getAllByLabelText('Zoom in on subject')
      expect(zoomInBtns.length).to.equal(4)
    })
  })

  describe('with images and videos', function () {
    const OneColumnImagesAndVideosStory = composeStory(OneColumnImagesAndVideos, Meta)

    it('should display an image element for each frame', async function () {
      const { container } = render(<OneColumnImagesAndVideosStory />)
      const imageElements = container.querySelectorAll('image')
      expect(imageElements.length).to.equal(4)
      const videoElements = container.querySelectorAll('video')
      expect(videoElements.length).to.equal(1)
    })
  })
})
