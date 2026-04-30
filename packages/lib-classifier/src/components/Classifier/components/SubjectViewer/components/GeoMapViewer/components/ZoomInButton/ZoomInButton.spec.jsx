import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './ZoomInButton.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > ZoomInButton', function () {
  it('should show the zoom in button with accessible name', function () {
    render(<DefaultStory />)
    expect(screen.getByRole('button', { name: 'Zoom in on subject' })).to.exist
  })
})
