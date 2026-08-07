import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import ImageMeta, { LoggedInLandscape } from '../../stories/interactive/singleMedia/SubjectCard.image.stories'
import MultiMediaMeta, { LoggedInMultiImage } from '../../stories/interactive/multiMedia/SubjectCard.multiMedia.stories'

describe('InteractiveMedia', function () {
  describe('with single image location', function () {
    it('should render a link wrapping the media', function () {
      const Story = composeStory(LoggedInLandscape, ImageMeta)
      render(<Story />)
      const link = screen.getByRole('link')
      expect(link).toBeDefined()
      expect(link.href).to.contain('/talk/subjects/75219502')
    })

    it('should not render flipbook controls', function () {
      const Story = composeStory(LoggedInLandscape, ImageMeta)
      render(<Story />)
      const buttons = screen.queryAllByTestId('flipbook-controls')
      expect(buttons.length).to.equal(0)
    })
  })

  describe('with multiple image locations', function () {
    it('should render a link wrapping the media', function () {
      const Story = composeStory(LoggedInMultiImage, MultiMediaMeta)
      render(<Story />)
      const link = screen.getByRole('link')
      expect(link).toBeDefined()
      expect(link.href).to.contain('/talk/subjects/121787506')
    })

    it('should render flipbook controls', function () {
      const Story = composeStory(LoggedInMultiImage, MultiMediaMeta)
      render(<Story />)
      const buttons = screen.getAllByTestId('flipbook-controls')
      expect(buttons).toBeDefined()
    })
  })
})
