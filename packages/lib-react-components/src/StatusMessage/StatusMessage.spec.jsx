import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './StatusMessage.stories'

describe('Component > Status Message', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should be accessible', function () {
    render(<DefaultStory />)
    expect(true).to.equal(true)
    // TODO
  })
})
