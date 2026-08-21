import { render, screen } from '@testing-library/react'

import Video from './Video'
import getThumbnailSrc from '../../helpers/getThumbnailSrc'
import { defaultProps } from '../../helpers/mediaPropTypes'

const videoSrc = 'https://static.zooniverse.org/fem-assets/home-video.mp4'
const panoptesVideoSrc = 'https://panoptes-uploads.zooniverse.org/subject_location/6d83e7bd-14d1-41cb-8245-8d70a4d3921a.mp4'

describe('Video', function () {
  it('should show a video element', function () {
    render(<Video src={videoSrc} />)
    const videoElement = document.querySelector('video')
    expect(videoElement).toBeTruthy()
  })

  it('should set the video poster to the thumbnailer src when showPoster is true', function () {
    render(<Video src={panoptesVideoSrc} showPoster />)
    const videoElement = document.querySelector('video')
    const expectedPoster = getThumbnailSrc({ height: 999, origin: defaultProps.origin, src: panoptesVideoSrc, width: 999 })
    expect(videoElement.getAttribute('poster')).to.equal(expectedPoster)
  })

  it('should set a default poster height when showPoster is true and only width is provided', function () {
    render(<Video src={panoptesVideoSrc} showPoster width={270} />)
    const videoElement = document.querySelector('video')
    const expectedPoster = getThumbnailSrc({ height: 270, origin: defaultProps.origin, src: panoptesVideoSrc, width: 270 })
    expect(videoElement.getAttribute('poster')).to.equal(expectedPoster)
  })

  it('should fall back to metadata preload and no poster for static.zooniverse.org videos', function () {
    render(<Video src={videoSrc} showPoster width={270} />)
    const videoElement = document.querySelector('video')
    expect(videoElement.getAttribute('poster')).to.equal(null)
    expect(videoElement.getAttribute('preload')).to.equal('metadata')
  })

  it('should fall back to metadata preload and no poster for unsupported video hosts', function () {
    render(<Video src='https://example.com/video.mp4' showPoster width={270} />)
    const videoElement = document.querySelector('video')
    expect(videoElement.getAttribute('poster')).to.equal(null)
    expect(videoElement.getAttribute('preload')).to.equal('metadata')
  })

  it('should show the video controls', function () {
    render(<Video src={videoSrc} />)
    const videoPlayButton = screen.getByRole('button', { name: 'play' })
    expect(videoPlayButton).toBeTruthy()
  })

  describe('height and width', function () {
    it('should be set if specified', function () {
      render(<Video height={200} width={270} src={videoSrc} />)
      const videoElement = screen.getByTestId('video-viewer')
      const { maxHeight, maxWidth } = window.getComputedStyle(videoElement)
      expect(maxHeight).to.equal('200px')
      expect(maxWidth).to.equal('270px')
    })

    it('should fill the container by default', function () {
      render(<Video src={videoSrc} />)
      const videoElement = screen.getByTestId('video-viewer')
      const { maxHeight, maxWidth } = window.getComputedStyle(videoElement)
      expect(maxHeight).to.equal('')
      expect(maxWidth).to.equal('100%')
    })
  })
})
