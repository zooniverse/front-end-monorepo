import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, Disabled } from './ShareIconButton.stories'

describe('ShareIconButton', function () {
  it('should have an aria label', function () {
    const DefaultShareIconButtonStory = composeStory(Default, Meta)
    render(<DefaultShareIconButtonStory />)
    const button = screen.getByRole('button', { name: 'Share' })
    expect(button).toBeDefined()
  })

  describe('without shareUrl', function () {
    it('should not be clickable', function () {
      const DisabledShareIconButtonStory = composeStory(Disabled, Meta)
      render(<DisabledShareIconButtonStory />)
      const button = screen.getByRole('button', { name: 'Share' })
      expect(button.disabled).to.equal(true)
    })
  })
})
