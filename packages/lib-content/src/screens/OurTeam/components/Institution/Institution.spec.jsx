import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './Institution.stories'

describe('Component > Institution', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should render the name', function () {
    render(<DefaultStory />)
    expect(screen.getByText(Default.args.name)).toBeTruthy()
  })
})
