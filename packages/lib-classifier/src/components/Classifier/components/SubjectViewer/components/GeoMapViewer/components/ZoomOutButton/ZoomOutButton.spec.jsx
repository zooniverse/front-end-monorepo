import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './ZoomOutButton.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > ZoomOutButton', function () {
  it('should show the zoom out button with accessible name', function () {
    render(<DefaultStory />)
    expect(screen.getByRole('button', { name: 'Zoom out from subject' })).to.exist
  })

  it('can be disabled when the map cannot zoom out further', function () {
    render(<DefaultStory disabled />)
    expect(screen.getByRole('button', { name: 'Zoom out from subject' }).disabled).to.equal(true)
  })
})
