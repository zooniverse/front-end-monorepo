import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default } from './FlipbookControls.stories'
import { SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT } from '../../../../stories/SubjectCardStoryData'

describe('FlipbookControls', function () {
  it('should render the correct number of frames', function () {
    const Story = composeStory(Default, Meta)
    render(<Story />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs.length).to.equal(SMITHSONIAN_WILDLIFE_MULTI_IMAGE_SUBJECT.locations.length)
  })
})
