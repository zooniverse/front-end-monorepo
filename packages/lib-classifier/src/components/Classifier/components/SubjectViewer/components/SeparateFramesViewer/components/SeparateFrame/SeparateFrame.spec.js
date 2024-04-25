import { render, screen } from '@testing-library/react'
import { expect } from 'chai'
import Meta, { Default } from './SeparateFrame.stories.js'
import { composeStory } from '@storybook/react'

describe('Component > SeparateFrame', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should display an image element', async function () {
    const { container } = render(<DefaultStory />)
    const imageElement = container.querySelector('image')
    expect(imageElement).exists()
  })

  it('should display an image toolbar', function () {
    render(<DefaultStory />)
    const zoomInBtn = screen.getByLabelText('ImageToolbar.ZoomInButton.ariaLabel')
    expect(zoomInBtn).exists()
  })
})
