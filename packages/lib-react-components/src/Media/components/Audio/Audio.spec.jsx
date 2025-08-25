import { render } from '@testing-library/react'

import Audio from './Audio'

const audio = 'https://panoptes-uploads.zooniverse.org/production/subject_location/1c93591f-5d7e-4129-a6da-a65419b88048.mpga'

describe('Audio', function () {
  it('should render an audio element', function () {
    render(<Audio src={audio} />)
    const audioElement = document.querySelector('audio')
    expect(audioElement).toBeDefined()
  })

  it('should set the aria-title using the alt prop', function () {
    const alt = "City noise"
    render(<Audio alt={alt} src={audio} />)
    const audioElement = document.querySelector('audio')
    expect(audioElement.getAttribute('aria-label')).to.equal(alt)
  })

  describe('height and width', function () {
    it('should be set if specified', function () {
      render(<Audio height={200} width={270} src={audio} />)
      const audioWrapper = document.querySelector('[class*="StyledBox"]')
      const computedStyle = window.getComputedStyle(audioWrapper)
      expect(computedStyle.maxHeight).to.equal('200px')
      expect(computedStyle.maxWidth).to.equal('270px')
    })

    it('should be ignored if not specified', function () {
      render(<Audio src={audio} />)
      const audioWrapper = document.querySelector('[class*="StyledBox"]')
      const computedStyle = window.getComputedStyle(audioWrapper)
      expect(computedStyle.maxHeight).to.equal('')
      expect(computedStyle.maxWidth).to.equal('100%')
    })
  })
})
