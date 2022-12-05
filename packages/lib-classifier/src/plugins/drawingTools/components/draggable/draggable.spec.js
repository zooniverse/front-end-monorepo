import { forwardRef } from 'react';
import { mount } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import SVGContext from '@plugins/drawingTools/shared/SVGContext'
import draggable from './draggable'

describe('draggable', function () {
  const StubComponent = forwardRef((props, ref) => {
    return <p ref={ref}>Hello there!</p>
  })
  const Draggable = draggable(StubComponent)
  const onStart = sinon.stub()
  const onMove = sinon.stub()
  const onEnd = sinon.stub()
  const mockSVGEvent = {
    matrixTransform: sinon.stub().callsFake(() => ({
      x: 100,
      y: 200
    }))
  }
  const mockSVG = {
    createSVGPoint: sinon.stub().callsFake(() => mockSVGEvent),
    getScreenCTM: sinon.stub().callsFake(() => ({
      inverse: sinon.stub()
    }))
  }
  let wrapper

  before(function () {
    wrapper = mount(
      <SVGContext.Provider value={{ svg: mockSVG }}>
        <svg>
          <Draggable
            dragStart={onStart}
            dragMove={onMove}
            dragEnd={onEnd}
          />
        </svg>
      </SVGContext.Provider>
    )
      .find(Draggable)
  })

  describe('on pointer down', function () {
    before(function () {
      const fakeEvent = {
        preventDefault () {
          return true
        },
        stopPropagation () {
          return true
        }
      }
      wrapper.simulate('pointerdown', fakeEvent)
    })

    it('should start dragging', function () {
      expect(onStart).to.have.been.calledOnce()
    })
  })

  describe('on pointer move', function () {
    before(function () {
      const fakeEvent = {
        preventDefault () {
          return true
        },
        stopPropagation () {
          return true
        }
      }
      wrapper.simulate('pointermove', fakeEvent)
    })

    it('should drag to a new position', function () {
      expect(onMove).to.have.been.calledOnce()
    })
  })

  describe('on pointer up', function () {
    before(function () {
      const fakeEvent = {
        currentTarget: {},
        preventDefault () {
          return true
        },
        stopPropagation () {
          return true
        }
      }
      wrapper.simulate('pointerup', fakeEvent)
    })

    it('should stop dragging', function () {
      expect(onEnd).to.have.been.calledOnce()
    })
  })
})
