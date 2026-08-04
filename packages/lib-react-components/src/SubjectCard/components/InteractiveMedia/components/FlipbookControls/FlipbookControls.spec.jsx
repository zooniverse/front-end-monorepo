import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, { Default, ExternalImages } from './FlipbookControls.stories'

describe('FlipbookControls', function () {
  it('should render the correct number of frames', function () {
    const Story = composeStory(Default, Meta)
    render(<Story />)
    const tabs = screen.getAllByRole('tab')
    expect(tabs.length).to.equal(10)
  })

  it('should render thumbnails for Zooniverse hosted images', function () {
    const Story = composeStory(Default, Meta)
    render(<Story />)

    const imageThumbnails = screen.getAllByTestId('frame-thumbnail-image')
    const fallbackIcons = screen.queryAllByTestId('frame-thumbnail-icon')

    expect(imageThumbnails.length).to.equal(10)
    expect(fallbackIcons.length).to.equal(0)
  })

  it('should render image icons for externally-hosted images', function () {
    const Story = composeStory(ExternalImages, Meta)
    render(<Story />)

    const fallbackIcons = screen.getAllByTestId('frame-thumbnail-icon')
    const imageThumbnails = screen.queryAllByTestId('frame-thumbnail-image')

    expect(fallbackIcons.length).to.equal(5)
    expect(imageThumbnails.length).to.equal(0)
  })
})
