import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, Checked, Disabled } from './InvertIconButton.stories'

describe('InvertIconButton', function () {
  it('should have an aria label', function () {
    const InvertIconButtonStory = composeStory(Default, Meta)
    render(<InvertIconButtonStory />)
    const button = screen.getByRole('checkbox', { name: 'Invert subject' })
    expect(button).to.exist()
  })

  describe('when checked', function () {
    it('should have aria-checked set to true', function () {
      const InvertIconButtonStory = composeStory(Checked, Meta)
      render(<InvertIconButtonStory />)
      const button = screen.getByRole('checkbox', { name: 'Reset subject' })
      expect(button.getAttribute('aria-checked')).to.equal('true')
    })
  })

  describe('when disabled', function () {
    it('should not be clickable', function () {
      const InvertIconButtonStory = composeStory(Disabled, Meta)
      render(<InvertIconButtonStory />)
      const button = screen.getByRole('checkbox', { name: 'Invert subject' })
      expect(button.disabled).to.be.true()
    })
  })
})
