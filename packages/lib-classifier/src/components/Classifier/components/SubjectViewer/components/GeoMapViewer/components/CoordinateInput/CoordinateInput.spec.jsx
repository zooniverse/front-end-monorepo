import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './CoordinateInput.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > CoordinateInput', function () {
  it('should render a coordinates label', function () {
    render(<DefaultStory />)
    expect(screen.getByText('Coordinates')).to.exist
  })

  it('should render a coordinates text input', function () {
    render(<DefaultStory />)
    expect(screen.getByRole('textbox', { name: 'Coordinates' })).to.exist
  })

  it('should render a go button', function () {
    render(<DefaultStory />)
    expect(screen.getByRole('button', { name: 'Go' })).to.exist
  })
})
