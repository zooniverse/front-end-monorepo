import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'

vi.mock('../SimpleMedia/SimpleMedia', function() {
  return {
    default: function MockSimpleMedia(props) {
      return (
        <div
          data-media-src={props.mediaSrc || ''}
          data-preview-height={props.previewHeight}
          data-testid='simple-media'
        />
      )
    }
  }
})

vi.mock('./components/MultiMedia', function() {
  return {
    MULTI_MEDIA_CONTROLS_HEIGHT: 45,
    default: function MockMultiMedia(props) {
      return (
        <div
          data-media-sources-length={props.mediaSources.length}
          data-preview-height={props.previewHeight}
          data-testid='multi-media'
        />
      )
    }
  }
})

import InteractiveMedia from './InteractiveMedia'

describe('InteractiveMedia', function() {
  it('renders nothing when no location sources are provided', function() {
    render(
      <InteractiveMedia
        previewHeight={200}
        subjectIdTitle='Subject 1'
        width={200}
      />
    )

    expect(screen.queryByRole('img')).toBeNull()
    expect(screen.queryByText('Subject 1')).toBeNull()
  })

  it('renders simple media for a single supported source', function() {
    render(
      <InteractiveMedia
        subject={{
          locations: [{ image: 'https://example.org/test.png' }]
        }}
        previewHeight={200}
        subjectIdTitle='Subject 1'
        width={200}
      />
    )

    expect(screen.getByTestId('simple-media')).toBeTruthy()
    expect(screen.queryByTestId('multi-media')).to.equal(null)
  })

  it('renders nothing for a single unsupported source type', function() {
    render(
      <InteractiveMedia
        subject={{
          locations: [{ audio: 'https://example.org/test.mp3' }]
        }}
        previewHeight={200}
        subjectIdTitle='Subject 1'
        width={200}
      />
    )

    expect(screen.queryByTestId('simple-media')).to.equal(null)
    expect(screen.queryByTestId('multi-media')).to.equal(null)
  })

  it('renders multi media when there are multiple media sources', function() {
    render(
      <InteractiveMedia
        subject={{
          locations: [
            { image: 'https://example.org/frame-1.png' },
            { image: 'https://example.org/frame-2.png' }
          ]
        }}
        previewHeight={200}
        subjectIdTitle='Subject 1'
        width={200}
      />
    )

    const multiMedia = screen.getByTestId('multi-media')

    expect(multiMedia).toBeTruthy()
    expect(multiMedia.dataset.mediaSourcesLength).to.equal('2')
    expect(multiMedia.dataset.previewHeight).to.equal('155')
    expect(screen.queryByTestId('simple-media')).to.equal(null)
  })
})
