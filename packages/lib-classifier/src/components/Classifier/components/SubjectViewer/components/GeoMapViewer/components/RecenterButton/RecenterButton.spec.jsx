import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './RecenterButton.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > RecenterButton', function () {
  it('should show the recenter button with accessible name', function () {
    render(<DefaultStory />)
    expect(screen.getByRole('button', { name: 'Recenter map to features' })).to.exist
  })
})
