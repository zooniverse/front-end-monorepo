import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import ImageMeta, { LoggedInLandscape, LoggedInMultiImage } from '../../stories/interactive/SubjectCard.image.stories'

describe('InteractiveMedia', function () {
  describe('with single image location', function () {
    it('should render a MediaLink wrapping the media', function () {
      const Story = composeStory(LoggedInLandscape, ImageMeta)
      render(<Story />)
      const link = screen.getByRole('link')
      expect(link).to.exist
      expect(link.href).to.contain('/talk/subjects/')
    })

    it('should not render FlipbookControls', function () {
      const Story = composeStory(LoggedInLandscape, ImageMeta)
      render(<Story />)
      const buttons = screen.queryAllByTestId('flipbook-controls')
      expect(buttons.length).to.equal(0)
    })
  })

  describe('with multiple image locations', function () {
    it('should render a MediaLink wrapping the media', function () {
      const Story = composeStory(LoggedInMultiImage, ImageMeta)
      render(<Story />)
      const link = screen.getByRole('link')
      expect(link).to.exist
      expect(link.href).to.contain('/talk/subjects/')
    })

    it('should render FlipbookControls', function () {
      const Story = composeStory(LoggedInMultiImage, ImageMeta)
      render(<Story />)
      const buttons = screen.getAllByTestId('flipbook-controls')
      expect(buttons).to.exist
    })
  })
})
