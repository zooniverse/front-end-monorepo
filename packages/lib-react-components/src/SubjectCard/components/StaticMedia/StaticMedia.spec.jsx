import { composeStory } from '@storybook/react'
import { render } from '@testing-library/react'

import ImageMeta, { LoggedInLandscape } from '../../stories/static/SubjectCard.image.stories'
import VideoMeta, { FloridaKeys } from '../../stories/static/SubjectCard.video.stories'
import AudioMeta, { FrogFind } from '../../stories/static/SubjectCard.audio.stories'
import ApplicationMeta, { NotesFromNatureGeoJSON } from '../../stories/static/SubjectCard.application.stories'
import TextMeta, { NotesFromNature } from '../../stories/static/SubjectCard.text.stories'

describe('StaticMedia', function () {
  it('renders image media', function () {
    const Story = composeStory(LoggedInLandscape, ImageMeta)

    render(<Story />)

    const imageMedia = document.querySelector('.thumbnailImage, img, [aria-hidden="true"][tabindex="-1"]')
    expect(imageMedia).toBeTruthy()
  })

  it('renders video media', function () {
    const Story = composeStory(FloridaKeys, VideoMeta)

    render(<Story />)

    const video = document.querySelector('video')
    expect(video).toBeTruthy()
  })

  it('renders audio media', function () {
    const Story = composeStory(FrogFind, AudioMeta)

    render(<Story />)

    const audioElement = document.querySelector('audio')
    expect(audioElement).toBeTruthy()
  })

  it('renders application media', function () {
    const Story = composeStory(NotesFromNatureGeoJSON, ApplicationMeta)

    render(<Story />)

    const dataViewer = document.querySelector('[data-testid="data-viewer"]')
    expect(dataViewer).toBeTruthy()
  })

  it('renders text media', function () {
    const Story = composeStory(NotesFromNature, TextMeta)

    render(<Story />)

    const textBlock = document.querySelector('pre')
    expect(textBlock).toBeTruthy()
  })
})
