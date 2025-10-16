import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default } from './AncillaryData.stories'

const DefaultStory = composeStory(Default, Meta)

describe('Component > SubjectTalkPage > AncillaryData', function () {
  it('should show the expected items', function () {
    render(<DefaultStory />)
    const ancillaryData = screen.getAllByRole('listitem')
    expect(ancillaryData.length).to.equal(3)
  })
})
