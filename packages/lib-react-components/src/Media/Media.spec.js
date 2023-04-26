import { render, screen } from '@testing-library/react'
import { composeStory } from '@storybook/react'

import Meta, * as Stories from './Media.stories.js'

describe('Media', function () {
  it('should render an image if the source mimetype is an image', async function () {
    const Story = composeStory(Stories.Image, Meta)
    render(<Story />)
    const image = await screen.findByRole('img')
    expect(image).to.be.ok()
  })

  it('should render video if the source mimetype is a video', function () {
    const Story = composeStory(Stories.Video, Meta)
    render(<Story />)
    const video = document.querySelector('video')
    expect(video).to.be.ok()
  })

  it('should render audio if the source mimetype is audio', function () {
    const Story = composeStory(Stories.Audio, Meta)
    render(<Story />)
    const audio = document.querySelector('audio')
    expect(audio).to.be.ok()
  })

  it('should render an SVG image if the source mimetype is application/json', async function () {
    const Story = composeStory(Stories.Data, Meta)
    render(<Story />)
    const image = await screen.findByTestId('data-viewer')
    expect(image).to.be.ok()
  })
})
