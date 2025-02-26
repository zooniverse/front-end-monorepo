import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './Person.stories.js'

describe('Component > Person', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should render the name and job title', function () {
    render(<DefaultStory />)
    const { jobTitle, name } = Default.args
    const displayString = screen.getByText(`${name}, ${jobTitle}`)
    expect(displayString).exists()
    expect(screen.queryByRole('link')).to.be.null()
  })
})
