import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, Disabled, Active, Anchor } from './IconActionButton.stories'

describe('IconActionButton', function () {
  it('should have an aria label', function () {
    const IconActionButtonStory = composeStory(Default, Meta)
    render(<IconActionButtonStory />)
    const button = screen.getByRole('button', { name: 'Metadata' })
    expect(button).toBeDefined()
  })

  describe('when disabled', function () {
    it('should not be clickable', function () {
      const IconActionButtonStory = composeStory(Disabled, Meta)
      render(<IconActionButtonStory />)
      const button = screen.getByRole('button', { name: 'Metadata' })
      expect(button.disabled).to.equal(true)
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

  describe('with an href prop', function () {
    it('should have a role of link', function () {
      const IconActionButtonStory = composeStory(Anchor, Meta)
      render(<IconActionButtonStory />)
      const link = screen.getByRole('link', { name: 'Home' })
      expect(link).toBeDefined()
    })
  })
})
