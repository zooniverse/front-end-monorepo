import { render } from '@testing-library/react'
import zooTheme from '@zooniverse/grommet-theme'
import { Grommet } from 'grommet'

import Text from './Text'

const src = 'https://panoptes-uploads.zooniverse.org/subject_location/f5506d1c-a0e9-4aba-a418-6a6c46a7731a.txt'

describe('Text', function () {
  it('should render without crashing', function () {
    render(
      <Grommet theme={zooTheme}>
        <Text alt='a test text' src={src} />
      </Grommet>
    )
    const text = document.querySelector('pre')
    expect(text).toBeTruthy()
  })

  it('should use alt text to describe the text.', function () {
    const alt = 'A text'
    render(
      <Grommet theme={zooTheme}>
        <Text alt={alt} src={src} />
      </Grommet>
    )
    const textSection = document.querySelector('section')
    expect(textSection.getAttribute('aria-label')).to.equal(alt)
  })

  it('should render empty if loading', function () {
    render(
      <Grommet theme={zooTheme}>
        <Text src={src} />
      </Grommet>
    )
    const text = document.querySelector('pre')
    expect(text.textContent).to.equal('')
  })

  describe('height and width', function () {
    it('should be set if specified', function () {
      render(
        <Grommet theme={zooTheme}>
          <Text height={300} width={370} src={src} />
        </Grommet>
      )
      const textSection = document.querySelector('section')
      const { maxHeight, maxWidth } = window.getComputedStyle(textSection)
      expect(maxHeight).to.equal('300px')
      expect(maxWidth).to.equal('370px')
    })

    it('should have a 200px maxHeight by default', function () {
      render(
        <Grommet theme={zooTheme}>
          <Text src={src} />
        </Grommet>
      )
      const textSection = document.querySelector('section')
      const { maxHeight } = window.getComputedStyle(textSection)
      expect(maxHeight).to.equal('200px')
    })
  })
})
