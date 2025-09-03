import { fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import sinon from 'sinon'
import { Grommet } from 'grommet'
import zooTheme from '@zooniverse/grommet-theme'

import ZoomEventLayer from '.'
import SVGImage from '../SVGImage'

const width = 768
const height = 384

describe('Component > ZoomEventLayer', function () {
  let onKeyDownSpy,
    onPointerDownSpy,
    onPointerMoveSpy,
    onPointerUpSpy,
    onPointerLeaveSpy,
    onDoubleClickSpy,
    onWheelSpy,
    wrapper,
    user,
    image
  beforeEach(function () {
    onKeyDownSpy = sinon.spy()
    onPointerDownSpy = sinon.spy()
    onPointerUpSpy = sinon.spy()
    onPointerMoveSpy = sinon.spy()
    onPointerLeaveSpy = sinon.spy()
    onDoubleClickSpy = sinon.spy()
    onWheelSpy = sinon.spy()

    render(
      <Grommet theme={zooTheme}>
        <svg>
          <ZoomEventLayer
            onDoubleClick={onDoubleClickSpy}
            onKeyDown={onKeyDownSpy}
            onPointerDown={onPointerDownSpy}
            onPointerMove={onPointerMoveSpy}
            onPointerUp={onPointerUpSpy}
            onPointerLeave={onPointerLeaveSpy}
            onWheel={onWheelSpy}
            height={height}
            width={width}
          >
            <SVGImage
              naturalWidth={width}
              naturalHeight={height}
              src="https://panoptes-uploads.zooniverse.org/production/subject_location/11f98201-1c3f-44d5-965b-e00373daeb18.jpeg"
              subjectID={'12345'}
            />
          </ZoomEventLayer>
        </svg>
      </Grommet>
    )
    wrapper = screen.getByTestId('zoom-layer')
    user = userEvent.setup({ delay: null })
    image = document.querySelector('image')
  })

  afterEach(function () {
    onKeyDownSpy.resetHistory()
    onDoubleClickSpy.resetHistory()
    onPointerDownSpy.resetHistory()
    onPointerUpSpy.resetHistory()
    onPointerMoveSpy.resetHistory()
    onPointerLeaveSpy.resetHistory()
    onWheelSpy.resetHistory()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.exist
  })

  it('should be the size of the parent', function () {
    expect(wrapper).to.have.attribute('width', width.toString())
    expect(wrapper).to.have.attribute('height', height.toString())
  })

  it('should call the onKeyDown prop callback when onKeyDown event fires', async function () {
    image.focus()
    await user.keyboard(' ')
    expect(onKeyDownSpy).to.have.been.calledOnce
  })

  it('should call the onPointerDown prop callback when onPointerDown event fires', async function () {
    await user.pointer([
      { keys: '[MouseLeft>]', target: image },
      { coords: { x: 10, y: 10 }, target: image },
      { keys: '[/MouseLeft]', target: image }
    ])
    expect(onPointerDownSpy).to.have.been.calledOnce
  })

  it('should call the onPointerUp prop callback when onPointerUp event fires', async function () {
    await user.pointer([
      { keys: '[MouseLeft>]', target: image },
      { coords: { x: 10, y: 10 }, target: image },
      { keys: '[/MouseLeft]', target: image }
    ])
    expect(onPointerUpSpy).to.have.been.calledOnce
  })

  it('should call the onPointerMove prop callback when onPointerMove event fires', async function () {
    await user.pointer([
      { keys: '[MouseLeft>]', target: image },
      { coords: { x: 10, y: 10 }, target: image },
      { keys: '[/MouseLeft]', target: image }
    ])
    expect(onPointerMoveSpy).to.have.been.calledOnce
  })

  it('should call the onPointerLeave prop callback when onPointerLeave event fires', async function () {
    await user.pointer([
      { keys: '[MouseLeft>]', target: image },
      { pointerName: 'mouse', target: document.body },
      { keys: '[/MouseLeft]', target: document.body }
    ])
    expect(onPointerLeaveSpy).to.have.been.calledOnce
  })

  it('should call the onDoubleClick prop callback when onDoubleClick event fires', async function () {
    await user.dblClick(wrapper)
    expect(onDoubleClickSpy).to.have.been.calledOnce
  })

  it('should call the onWheel prop callback when onWheel event fires', function () {
    fireEvent.wheel(image)
    expect(onWheelSpy).to.have.been.calledOnce
  })
})
