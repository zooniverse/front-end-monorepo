import * as stories from './AdminCheckbox.stories'
import { render, screen } from '@testing-library/react'
import { composeStories } from '@storybook/react'

describe('<AdminCheckbox />', function () {
  const { Default } = composeStories(stories)

  it('should render the label', function () {
    render(<Default />)
    const item = screen.getByText('Admin Mode')
    expect(item).toBeTruthy()
  })
})
