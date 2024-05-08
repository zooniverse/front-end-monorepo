import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './Institution.stories.js'

describe('Component > Team', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should render the team name', function () {
    render(<DefaultStory />)
    expect(screen.getByText(Default.args.name)).exists()
  })
})
