import { render, screen } from '@testing-library/react'
import * as stories from './AudioSpectrogramViewerContainer.stories'
import { composeStories } from '@storybook/react'

describe('Component > AudioSpectrogramViewerContainer', function () {
  const { Default, NoSubject } = composeStories(stories)

  describe('with an audio+image subject', function () {
    it('should render an audio html element', function () {
      const { container } = render(<Default />)
      const audioElement = container.querySelector('audio')
      expect(audioElement).to.exist
    })

    it('should render a spectrogram image', function () {
      const { container } = render(<Default />)
      const imgElement = container.querySelector('img[alt="Spectrogram"]')
      expect(imgElement).to.exist
    })

    it('should render a progress marker', function () {
      const { container } = render(<Default />)
      const marker = container.querySelector('[data-testid="spectrogram-progress-marker"]')
      expect(marker).to.exist
    })

    it('should set controls on the audio element', function () {
      const { container } = render(<Default />)
      const audioElement = container.querySelector('audio')
      expect(audioElement.controls).to.equal(true)
    })
  })

  describe('without a subject', function () {
    it('should display an error message and no audio element', function () {
      const { container } = render(<NoSubject />)
      const audioElement = container.querySelector('audio')
      const errorMessage = screen.getByText('There was an error loading the subject.')
      expect(audioElement).to.equal(null)
      expect(errorMessage).to.exist
    })
  })
})
