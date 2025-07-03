import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, Disabled, Active } from './IconActionButton.stories'

describe('IconActionButton', function () {
  it('should have an aria label', function () {
    const IconActionButtonStory = composeStory(Default, Meta)
    render(<IconActionButtonStory />)
    const button = screen.getByRole('button', { name: 'Metadata' })
    expect(button).to.exist()
  })

  describe('when disabled', function () {
    it('should not be clickable', function () {
      const IconActionButtonStory = composeStory(Disabled, Meta)
      render(<IconActionButtonStory />)
      const button = screen.getByRole('button', { name: 'Metadata' })
      expect(button.disabled).to.be.true()
    })
  })

  describe('when active', function () {
    it('should have aria-pressed set to true', function () {
      const IconActionButtonStory = composeStory(Active, Meta)
      render(<IconActionButtonStory />)
      const button = screen.getByRole('button', { name: 'Metadata' })
      expect(button.getAttribute('aria-pressed')).to.equal('true')
    })
  })
})
