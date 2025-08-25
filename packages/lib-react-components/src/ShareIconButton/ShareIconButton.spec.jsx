import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './ShareIconButton.stories'

describe('ShareIconButton', function () {
  it('should have an aria label', function () {
    const ShareIconButtonStory = composeStory(Default, Meta)
    render(<ShareIconButtonStory />)
    const button = screen.getByRole('button', { name: 'Share' })
    expect(button).toBeDefined()
  })

  describe('when disabled', function () {
    it('should not be clickable', function () {
      const ShareIconButtonStory = composeStory({ ...Default, args: { disabled: true } }, Meta)
      render(<ShareIconButtonStory />)
      const button = screen.getByRole('button', { name: 'Share' })
      expect(button.disabled).to.equal(true)
    })
  })
})
