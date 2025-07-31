import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './Discipline.stories'

describe('Component > Discipline', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should render the title', function () {
    render(<DefaultStory />)
    expect(screen.getByText(Default.args.title)).toBeTruthy()
  })
})
