import { render, screen } from '@testing-library/react'

import Text from './Text.js'

const src = 'https://panoptes-uploads.zooniverse.org/subject_location/f5506d1c-a0e9-4aba-a418-6a6c46a7731a.txt'

describe('Text', function () {
  it('should render without crashing', function () {
    render(<Text alt='a test text' src={src} />)
    const text = document.querySelector('pre')
    expect(text).to.be.ok()
  })

  it('should use alt text to describe the text.', function () {
    const alt = "A text"
    render(<Text alt={alt} src={src} />)
    const textSection = document.querySelector('section')
    expect(textSection.getAttribute('aria-label')).to.equal(alt)
  })

  it('should render empty if loading', function () {
    render(<Text src={src} />)
    const text = document.querySelector('pre')
    expect(text.textContent).to.equal('')
  })

  describe('height and width', function () {
    it('should be set if specified', function () {
      render(<Text height={300} width={370} src={src} />)
      const textSection = document.querySelector('section')
      const { maxHeight, maxWidth } = window.getComputedStyle(textSection)
      expect(maxHeight).to.equal('300px')
      expect(maxWidth).to.equal('370px')
    })

    it('should have a 200px maxHeight by default', function () {
      render(<Text src={src} />)
      const textSection = document.querySelector('section')
      const { maxHeight } = window.getComputedStyle(textSection)
      expect(maxHeight).to.equal('200px')
    })
  })
})
