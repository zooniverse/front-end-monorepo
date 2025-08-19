import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, Disabled } from './ImageIconButton.stories'

describe('ImageIconButton', function () {
  it('should be an anchor element', function () {
    const ImageIconButtonStory = composeStory(Default, Meta)
    render(<ImageIconButtonStory />)
    const link = screen.getByRole('link', { name: 'Subject image' })
    expect(link).to.exist()
    expect(link.href).to.equal('https://panoptes-uploads.zooniverse.org/subject_location/124cfc2d-2d39-4c84-995c-2e3ce9f75317.jpeg')
  })

  describe('when disabled', function () {
    it('should not be clickable', function () {
      const ImageIconButtonStory = composeStory(Disabled, Meta)
      render(<ImageIconButtonStory />)
      const button = screen.getByRole('button', { name: 'Subject image' })
      expect(button.disabled).to.be.true()
    })
  })
})
