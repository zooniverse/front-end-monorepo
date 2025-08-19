import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'
import Meta, { Default, Disabled } from './CloseButton.stories'

describe('Component > CloseButton', function () {
  it('renders the default button', function () {
    const DefaultStory = composeStory(Default, Meta)
    render(<DefaultStory />)
    expect(screen.getByRole('button').hasAttribute('disabled')).to.be.false()
  })

  it('renders the disabled button', function () {
    const DisabledStory = composeStory(Disabled, Meta)
    render(<DisabledStory />)
    expect(screen.getByRole('button').hasAttribute('disabled')).to.be.true()
  })
})
