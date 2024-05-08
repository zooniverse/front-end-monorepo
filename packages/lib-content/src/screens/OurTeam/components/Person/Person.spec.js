import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, WithTwitter } from './Person.stories.js'

describe('Component > Person', function () {
  const DefaultStory = composeStory(Default, Meta)
  const WithTwitterStory = composeStory(WithTwitter, Meta)

  it('should render the name and job title', function () {
    render(<DefaultStory />)
    const { jobTitle, name } = Default.args
    const displayString = screen.getByText(`${name}, ${jobTitle}`)
    expect(displayString).exists()
    expect(screen.queryByRole('link')).to.be.null() // no twitter handle
  })

  it('should render a twitter link if handle is defined', function () {
    render(<WithTwitterStory />)
    const twitterLink = screen.getByRole('link')
    expect(twitterLink.href).includes('twitter')
  })
})
