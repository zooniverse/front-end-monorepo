import { composeStory } from '@storybook/react'
import { render, screen } from '@testing-library/react'

import Meta, { Default, NoMedia } from './AncillaryData.stories'

const DefaultStory = composeStory(Default, Meta)
const NoMediaStory = composeStory(NoMedia, Meta)

describe('Component > SubjectTalkPage > AncillaryData', function () {
  it('should show the expected items', function () {
    render(<DefaultStory />)
    const ancillaryData = screen.getAllByRole('listitem')
    expect(ancillaryData.length).to.equal(3)
  })

  it('should show nothing when there is no data', function () {
    render(<NoMediaStory />)
    const ancillaryData = screen.queryByRole('listitem')
    expect(ancillaryData).to.be.null
  })
})
