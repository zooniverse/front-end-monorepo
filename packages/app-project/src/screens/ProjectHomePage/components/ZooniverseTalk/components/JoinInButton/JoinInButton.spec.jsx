import { render } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './JoinInButton.stories'

describe('Component > Zooniverse Talk > Join In', function () {
  const DefaultStory = composeStory(Default, Meta)

  beforeEach(function () {
    render(<DefaultStory />)
  })

  it('should render a link to the Talk board', function () {
    expect(
      document.querySelector(
        `[href="https://www.zooniverse.org/projects/zooniverse/snapshot-serengeti/talk"]`
      )
    ).toBeDefined()
  })
})
