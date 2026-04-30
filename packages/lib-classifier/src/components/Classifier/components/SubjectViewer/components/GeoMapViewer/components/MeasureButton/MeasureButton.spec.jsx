import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Meta, { Default, Active } from './MeasureButton.stories'

const DefaultStory = composeStory(Default, Meta)
const ActiveStory = composeStory(Active, Meta)

describe('Component > MeasureButton', function () {
  it('should show the measure button with accessible name', function () {
    render(<DefaultStory />)
    expect(screen.getByRole('button', { name: 'Measure distance' })).to.exist
  })

  it('should show the measure button in an active state', function () {
    render(<ActiveStory />)
    expect(screen.getByRole('button', { name: 'Measure distance' })).to.exist
  })
})
