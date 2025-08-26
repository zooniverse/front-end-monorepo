import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import Meta, { OneColumn } from './SeparateFramesViewer.stories.js'
import { composeStory } from '@storybook/react'

describe('Component > SeparateFramesViewer', function () {
  const OneColumnStory = composeStory(OneColumn, Meta)

  it('should display an image element for each frame', async function () {
    const { container } = render(<OneColumnStory />)
    const imageElements = container.querySelectorAll('image')
    expect(imageElements.length).to.equal(4) // mockSubject.locations.length
  })

  it('should display an image toolbar for each frame', function () {
    render(<OneColumnStory />)
    const zoomInBtns = screen.getAllByLabelText('ImageToolbar.ZoomInButton.ariaLabel')
    expect(zoomInBtns.length).to.equal(4)
  })
})
