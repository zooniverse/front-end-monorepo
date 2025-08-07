import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { HeaderLinkPrimaryItem } from './HeaderLink.stories'

describe('components > shared > HeaderLink', function() {
  const DefaultStory = composeStory(HeaderLinkPrimaryItem, Meta)

  it('should render the link', function () {
    render(<DefaultStory />)

    expect(screen.getByRole('link')).to.have.property('href')
      .to.equal('https://zooniverse.org/users/testUser')

    expect(screen.getByRole('link')).to.have.property('text')
      .to.equal('back to profile')
  })
})
