import { render, screen } from '@testing-library/react'

import Video from './Video'

const videoSrc = 'https://static.zooniverse.org/fem-assets/home-video.mp4'

describe('Video', function () {
  it('should show a video element', function () {
    render(<Video src={videoSrc} />)
    const videoElement = document.querySelector('video')
    expect(videoElement).toBeTruthy()
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
