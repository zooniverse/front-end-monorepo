import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, {
  SingleImageSubject,
  MultiImageSubject,
  AudioSpectrogramSubject
} from './SubjectTalkViewer.stories'
import { vi } from 'vitest'

/* This test suite uses vi.dynamicImportSettled because FlipbookControls
  is dynamically imported in lib-classifier.
  https://v0.vitest.dev/api/vi.html#vi-dynamicimportsettled
*/

const SingleImageSubjectStory = composeStory(SingleImageSubject, Meta)
const MultiImageSubjectStory = composeStory(MultiImageSubject, Meta)
const AudioSpectrogramSubjectStory = composeStory(AudioSpectrogramSubject, Meta)

describe('Component > SubjectTalkPage > SubjectTalkViewer', function () {
  describe('with a single image subject', function () {
    it('should render without crashing', async function () {
      const output = render(<SingleImageSubjectStory />)
      await vi.dynamicImportSettled()
      expect(output).toBeTruthy() // These assertions should be refined to look for a specific UI element. False positive when the parent jsdom body is rendered.
    })

    it('should not render flipbook controls with location thumbnails', async function () {
      render(<SingleImageSubjectStory />)
      await vi.dynamicImportSettled()
      const imageThumbnails = screen.queryByLabelText('Image thumbnails')
      expect(imageThumbnails).to.equal(null)
    })
  })

  describe('with a multi image subject', function () {
    it('should render without crashing', async function () {
      const output = render(<MultiImageSubjectStory />)
      await vi.dynamicImportSettled()
      expect(output).toBeTruthy() // These assertions should be refined to look for a specific UI element. False positive when the parent jsdom body is rendered.
    })

    it.skip('should render flipbook controls with location thumbnails', async function () {
      render(<MultiImageSubjectStory />)
      await vi.dynamicImportSettled()

      const imageThumbnails = screen.getByLabelText('Image thumbnails')
      expect(imageThumbnails).toBeDefined()
    })
  })

  describe('with an audio+image (spectrogram) subject', function () {
    it('should render without crashing', async function () {
      const output = render(<AudioSpectrogramSubjectStory />)
      await vi.dynamicImportSettled()
      expect(output).toBeTruthy()
    })

    it('should not render flipbook controls', async function () {
      render(<AudioSpectrogramSubjectStory />)
      await vi.dynamicImportSettled()
      const imageThumbnails = screen.queryByLabelText('Image thumbnails')
      expect(imageThumbnails).to.equal(null)
    })

    it('should render native audio controls', async function () {
      const { container } = render(<AudioSpectrogramSubjectStory />)
      await vi.dynamicImportSettled()
      const audio = container.querySelector('audio')
      expect(audio).toBeDefined()
      expect(audio.hasAttribute('controls')).to.equal(true)
    })

    it('should render the audio source from the subject', async function () {
      const { container } = render(<AudioSpectrogramSubjectStory />)
      await vi.dynamicImportSettled()
      const audio = container.querySelector('audio')
      expect(audio).toBeDefined()
      expect(audio.src).toContain('panoptes-uploads.zooniverse.org')
    })
  })
})
