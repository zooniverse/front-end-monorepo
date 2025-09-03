import { render, screen } from '@testing-library/react'
import Meta, { Default } from './SeparateFrame.stories'
import { composeStory } from '@storybook/react'

describe('Component > SeparateFrame', function () {
  const DefaultStory = composeStory(Default, Meta)

  it('should display an image element', async function () {
    const { container } = render(<DefaultStory />)
    const imageElement = container.querySelector('image')
    expect(imageElement).to.exist
  })

  it('should display an image toolbar', function () {
    render(<DefaultStory />)
    const zoomInBtn = screen.getByLabelText('Zoom in on subject')
    expect(zoomInBtn).to.exist
  })
})
