import { render, screen } from '@testing-library/react'

import Audio from './Audio'

const mediaSrc = 'https://panoptes-uploads.zooniverse.org/subject_location/e588bae3-5ed8-49e5-a8f4-97b70b46332b.mpga'
const url = 'https://www.zooniverse.org/projects/ollibruuh/frog-find/talk/subjects/70200265'
const linkTitle = 'Subject 70200265 Talk page'
const subjectIdTitle = 'Subject 70200265'
const previewHeight = 300
const width = 400

describe('Audio', function () {
  it('should render without crashing', function () {
    render(
      <Audio
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const audioElement = document.querySelector('audio')
    expect(audioElement).toBeTruthy()
  })

  it('should render an audio element with the correct src', function () {
    render(
      <Audio
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const audioElement = document.querySelector('audio')
    expect(audioElement).toBeTruthy()
    const sourceElement = audioElement.querySelector('source')
    expect(sourceElement.src).to.include(mediaSrc)
  })

  it('should have aria-label for accessibility', function () {
    render(
      <Audio
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const audioElement = document.querySelector('audio')
    expect(audioElement.getAttribute('aria-label')).to.equal(subjectIdTitle)
  })

  it('should render audio controls', function () {
    render(
      <Audio
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const audioElement = document.querySelector('audio')
    expect(audioElement.hasAttribute('controls')).to.be.true
  })

  it('should set preload to metadata', function () {
    render(
      <Audio
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const audioElement = document.querySelector('audio')
    expect(audioElement.getAttribute('preload')).to.equal('metadata')
  })
  
  it('should render a link with the correct href and title', function () {
    const { container } = render(
      <Audio
        linkTitle={linkTitle}
        mediaSrc={mediaSrc}
        previewHeight={previewHeight}
        subjectIdTitle={subjectIdTitle}
        url={url}
        width={width}
      />
    )
    const audioElement = container.querySelector('audio')
    const links = container.querySelectorAll('a')
    // The first link is the MediaLink wrapper (before the audio element)
    const mediaLink = links[0]
    expect(mediaLink).toBeTruthy()
    expect(mediaLink.getAttribute('aria-label')).to.equal(linkTitle)
    expect(mediaLink.href).to.equal(url)
  })
})
