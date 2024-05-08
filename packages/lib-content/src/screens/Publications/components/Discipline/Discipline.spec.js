import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './Discipline.stories.js'

describe('Component > Category', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should render the category title', function () {
    render(<DefaultStory />)
    expect(screen.getByText(Default.args.title)).exists()
  })
})
