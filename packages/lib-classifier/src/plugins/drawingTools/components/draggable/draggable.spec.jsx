import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { forwardRef } from 'react'
import sinon from 'sinon'
import draggable from './draggable'

describe('draggable', function () {
  const StubComponent = forwardRef((props, ref) => {
    return <p id='pointer-target' ref={ref}>Hello there!</p>
  })
  const Draggable = draggable(StubComponent)
  const onStart = sinon.stub()
  const onMove = sinon.stub()
  const onEnd = sinon.stub()

  beforeEach(function () {
    render(
      <svg>
        <Draggable
          dragStart={onStart}
          dragMove={onMove}
          dragEnd={onEnd}
        />
      </svg>
    )
  })

  afterEach(function () {
    sinon.resetHistory()
  })

  describe('on pointer down', function () {
    beforeEach(async function () {
      const user = userEvent.setup()
      await user.pointer({ keys: '[MouseLeft>]', target: document.querySelector('#pointer-target') })
    })

    it('should start dragging', function () {
      expect(onStart).to.have.been.calledOnce
    })
  })

  describe('on pointer move', function () {
    beforeEach(async function () {
      const user = userEvent.setup()
      await user.pointer([
        { keys: '[MouseLeft>]', target: document.querySelector('#pointer-target') },
        { coords: { x: 10, y: 10 }}
      ])
    })

    it('should drag to a new position', function () {
      expect(onMove).to.have.been.calledOnce
    })
  })

  describe('on pointer up', function () {
    beforeEach(async function () {
      const user = userEvent.setup()
      await user.pointer([
        { keys: '[MouseLeft>]', target: document.querySelector('#pointer-target') },
        { coords: { x: 10, y: 10 }},
        { keys: '[/MouseLeft]' },
      ])
    })

    it('should stop dragging', function () {
      expect(onEnd).to.have.been.calledOnce
    })
  })
})

describe('draggable, on pointer cancel', function () {
  const StubComponent = forwardRef((props, ref) => {
    return <p id='cancel-target' ref={ref}>Hello there!</p>
  })
  const Draggable = draggable(StubComponent)
  const onEnd = sinon.stub()

  beforeEach(function () {
    onEnd.resetHistory()
    render(
      <svg>
        <Draggable dragEnd={onEnd} />
      </svg>
    )
  })

  it('should end the drag when the browser cancels the pointer', function () {
    const target = document.querySelector('#cancel-target')
    target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true, pointerId: 1 }))
    target.dispatchEvent(new PointerEvent('pointercancel', { bubbles: true, pointerId: 1 }))

    expect(onEnd).to.have.been.calledOnce
  })
})
