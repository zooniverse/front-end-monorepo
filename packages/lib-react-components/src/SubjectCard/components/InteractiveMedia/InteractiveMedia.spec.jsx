import { render, screen } from '@testing-library/react'

import InteractiveMedia from './InteractiveMedia'

describe('InteractiveMedia', function() {
  it('renders nothing when mediaSrc is not provided', function() {
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

  it('renders image media without the title overlay with mediaSrc', function() {
    const { container } = render(
      <InteractiveMedia
        mediaSrc='https://example.org/test.png'
        previewHeight={200}
        showBackground={true}
        subjectIdTitle='Subject 1'
        width={200}
      />
    )

    const imageMedia = container.querySelector('.thumbnailImage, img, [aria-hidden="true"][tabindex="-1"]')

    expect(imageMedia).toBeTruthy()
    expect(screen.queryByText('Subject 1')).toBeNull()
  })
})
