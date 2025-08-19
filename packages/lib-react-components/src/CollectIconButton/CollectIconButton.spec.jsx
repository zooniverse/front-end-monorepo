import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, Disabled } from './CollectIconButton.stories'

describe('CollectIconButton', function () {
  it('should have an aria label', function () {
    const CollectIconButtonStory = composeStory(Default, Meta)
    render(<CollectIconButtonStory />)
    const button = screen.getByRole('button', { name: 'Add to collection' })
    expect(button).to.exist()
  })

  describe('when disabled', function () {
    it('should not be clickable', function () {
      const CollectIconButtonStory = composeStory(Disabled, Meta)
      render(<CollectIconButtonStory />)
      const button = screen.getByRole('button', { name: 'Add to collection' })
      expect(button.disabled).to.be.true()
    })
  })
})
