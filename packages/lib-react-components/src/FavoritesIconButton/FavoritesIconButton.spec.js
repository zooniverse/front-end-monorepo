import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, Checked, Disabled } from './FavoritesIconButton.stories'

describe('FavoritesIconButton', function () {
  it('should have an aria label', function () {
    const FavoritesIconButtonStory = composeStory(Default, Meta)
    render(<FavoritesIconButtonStory />)
    const button = screen.getByRole('checkbox', { name: 'Add to favorites' })
    expect(button).to.exist()
  })

  describe('when checked', function () {
    it('should have aria-checked set to true', function () {
      const FavoritesIconButtonStory = composeStory(Checked, Meta)
      render(<FavoritesIconButtonStory />)
      const button = screen.getByRole('checkbox', { name: 'Added to favorites' })
      expect(button.getAttribute('aria-checked')).to.equal('true')
    })
  })

  describe('when disabled', function () {
    it('should not be clickable', function () {
      const FavoritesIconButtonStory = composeStory(Disabled, Meta)
      render(<FavoritesIconButtonStory />)
      const button = screen.getByRole('checkbox', { name: 'Add to favorites' })
      expect(button.disabled).to.be.true()
    })
  })
})
