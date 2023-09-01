import { render, screen } from '@testing-library/react'
import * as Stories from './Media.stories.js'
import SpecStory from '@storybook_config/specStory'

describe('Media', function () {
  it('should render an image if the source mimetype is an image', async function () {
    const Story = SpecStory(Stories.Image)
    render(<Story />)
    const image = await screen.findByRole('img')
    expect(image).to.be.ok()
  })

  it('should render video if the source mimetype is a video', function () {
    const Story = SpecStory(Stories.Video)
    render(<Story />)
    const video = document.querySelector('video')
    expect(video).to.be.ok()
  })

  it('should render audio if the source mimetype is audio', function () {
    const Story = SpecStory(Stories.Audio)
    render(<Story />)
    const audio = document.querySelector('audio')
    expect(audio).to.be.ok()
  })

  it('should render an SVG image if the source mimetype is application/json', async function () {
    const Story = SpecStory(Stories.Data)
    render(<Story />)
    const image = await screen.findByTestId('data-viewer')
    expect(image).to.be.ok()
  })
})
