import { render, screen } from '@testing-library/react'

import Video from './Video'

const mediaSrc = 'https://panoptes-uploads.zooniverse.org/subject_location/6d83e7bd-14d1-41cb-8245-8d70a4d3921a.mp4'
const url = 'https://www.zooniverse.org/projects/fwc/marine-lens-florida-keys/talk/subjects/120994401'
const linkTitle = 'Subject 120994401 Talk page'
const subjectIdTitle = 'Subject 120994401'
const previewHeight = 300
const width = 400

describe('Video', function () {
  it('should render without crashing', function () {
    render(
      <Video
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const videoElement = document.querySelector('video')
    expect(videoElement).toBeTruthy()
  })

  it('should render a video element with the correct src', function () {
    render(
      <Video
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const videoElement = document.querySelector('video')
    expect(videoElement).toBeTruthy()
    expect(videoElement.src).to.include(mediaSrc)
  })

  it('should set the poster attribute', function () {
    render(
      <Video
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const videoElement = document.querySelector('video')
    expect(videoElement.hasAttribute('poster')).to.be.true
  })

  it('should set preload to none when poster is available', function () {
    render(
      <Video
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const videoElement = document.querySelector('video')
    expect(videoElement.getAttribute('preload')).to.equal('none')
  })
  
  it('should render a link with the correct href and title', function () {
    render(
      <Video
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const link = screen.getByRole('link', { name: linkTitle })
    expect(link).toBeTruthy()
    expect(link.href).to.equal(url)
  })
})
