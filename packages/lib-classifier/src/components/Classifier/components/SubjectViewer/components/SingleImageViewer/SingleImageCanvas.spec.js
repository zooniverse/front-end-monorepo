import { render, screen } from '@testing-library/react'

const SUBJECT_IMAGE_URL = 'https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg'

import SingleImageCanvas from './SingleImageCanvas'

describe('Component > SingleImageCanvas', function () {
  it('should render without crashing', function () {
    render(
      <SingleImageCanvas
        enableInteractionLayer={false}
        frame={0}
        imgRef={{ current: { naturalHeight: 0, naturalWidth: 0, src: '' } }}
        invert={false}
        move={false}
        naturalHeight={100}
        naturalWidth={100}
        rotation={0}
        src={SUBJECT_IMAGE_URL}
        subject={{ id: '1234', locations: [{ url: SUBJECT_IMAGE_URL }] }}
        transform=''
        transformMatrix={{ scaleX: 1, translateX: 0, translateY: 0 }}
      />
    )
    expect(screen.getByRole('img')).to.exist()
  })

  it('should apply the rotation transform', function () {
    render(
      <SingleImageCanvas
        enableInteractionLayer={false}
        frame={0}
        imgRef={{ current: { naturalHeight: 0, naturalWidth: 0, src: '' } }}
        invert={false}
        move={false}
        naturalHeight={100}
        naturalWidth={100}
        rotation={45}
        src={SUBJECT_IMAGE_URL}
        subject={{ id: '1234', locations: [{ url: SUBJECT_IMAGE_URL }] }}
        transform=''
        transformMatrix={{ scaleX: 1, translateX: 0, translateY: 0 }}
      />
    )
    const rotationGroup = screen.getByTestId('single-image-canvas-rotation-transform-group')
    expect(rotationGroup.getAttribute('transform')).to.equal('rotate(45 50 50)')
  })

  it('should apply the zoom transform', function () {
    render(
      <SingleImageCanvas
        enableInteractionLayer={false}
        frame={0}
        imgRef={{ current: { naturalHeight: 0, naturalWidth: 0, src: '' } }}
        invert={false}
        move={false}
        naturalHeight={100}
        naturalWidth={100}
        rotation={0}
        src={SUBJECT_IMAGE_URL}
        subject={{ id: '1234', locations: [{ url: SUBJECT_IMAGE_URL }] }}
        transform='matrix(2 0 0 2 0 0)'
        transformMatrix={{ scaleX: 2, translateX: 0, translateY: 0 }}
      />
    )
    const zoomGroup = screen.getByTestId('single-image-canvas-visxzoom-transform-group')
    expect(zoomGroup.getAttribute('transform')).to.equal('matrix(2 0 0 2 0 0)')
  })
})
