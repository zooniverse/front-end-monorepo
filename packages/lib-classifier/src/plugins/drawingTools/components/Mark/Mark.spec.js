import React from 'react'
import { mount, shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { EllipseTool, PointTool } from '@plugins/drawingTools/models/tools'
import { Mark } from './Mark'
import Point from '../Point'

describe('Drawing tools > Mark', function () {
  const pointTool = PointTool.create({
    type: 'point',
    tasks: [{
      taskKey: 'T0.0.0',
      type: 'text',
      instruction: 'dummy task'
    }]
  })
  let point
  const onDelete = sinon.stub()
  const onFinish = sinon.stub()
  const onSelect = sinon.stub()
  let wrapper

  before(function () {
    sinon.stub(window, 'scrollTo')
    point = pointTool.createMark({
      id: 'point1'
    })
    point.finish()
    wrapper = shallow(
      <Mark
        label='Point 1'
        mark={point}
        onDelete={onDelete}
        onFinish={onFinish}
        onSelect={onSelect}
      >
        <Point mark={point} />
      </Mark>
    )
  })

  after(function () {
    onFinish.resetHistory()
    onSelect.resetHistory()
    window.scrollTo.restore()
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a child drawing tool', function () {
    expect(wrapper.find(Point)).to.have.lengthOf(1)
  })

  describe('on focus', function () {
    before(function () {
      wrapper.root().simulate('focus')
    })

    it('should be selected', function () {
      expect(onSelect).to.have.been.calledOnce()
    })
  })

  describe('on keydown', function () {
    describe('with backspace', function () {
      const fakeEvent = {
        key: 'Backspace',
        preventDefault: sinon.stub(),
        stopPropagation: sinon.stub()
      }

      before(function () {
        wrapper.simulate('keydown', fakeEvent)
      })

      after(function () {
        onDelete.resetHistory()
      })

      it('should cancel event bubbling', function () {
        expect(fakeEvent.stopPropagation).to.have.been.calledOnce()
      })

      it('should cancel the default backspace handler', function () {
        expect(fakeEvent.preventDefault).to.have.been.calledOnce()
      })

      it('should be deleted', function () {
        expect(onDelete).to.have.been.calledOnce()
      })
    })

    describe('with enter', function () {
      const fakeEvent = {
        key: 'Enter',
        preventDefault: sinon.stub(),
        stopPropagation: sinon.stub()
      }

      before(function () {
        point.setSubTaskVisibility(false)
        wrapper.simulate('keydown', fakeEvent)
      })

      after(function () {
        onFinish.resetHistory()
      })

      it('should cancel event bubbling', function () {
        expect(fakeEvent.stopPropagation).to.have.been.calledOnce()
      })

      it('should cancel the default enter handler', function () {
        expect(fakeEvent.preventDefault).to.have.been.calledOnce()
      })

      it('should set subtask visibility', function () {
        expect(point.subTaskVisibility).to.be.true()
      })

      it('should call onFinish', function () {
        expect(onFinish).to.have.been.calledOnce()
      })
    })

    describe('with space', function () {
      const fakeEvent = {
        key: ' ',
        preventDefault: sinon.stub(),
        stopPropagation: sinon.stub()
      }

      before(function () {
        point.setSubTaskVisibility(false)
        wrapper.simulate('keydown', fakeEvent)
      })

      after(function () {
        onFinish.resetHistory()
      })

      it('should cancel event bubbling', function () {
        expect(fakeEvent.stopPropagation).to.have.been.calledOnce()
      })

      it('should cancel the default space handler', function () {
        expect(fakeEvent.preventDefault).to.have.been.calledOnce()
      })

      it('should set subtask visibility', function () {
        expect(point.subTaskVisibility).to.be.true()
      })

      it('should call onFinish', function () {
        expect(onFinish).to.have.been.calledOnce()
      })
    })

    describe('with other keys', function () {
      const fakeEvent = {
        key: 'Tab',
        preventDefault: sinon.stub(),
        stopPropagation: sinon.stub()
      }
      before(function () {
        point.setSubTaskVisibility(false)
        wrapper.simulate('keydown', fakeEvent)
      })

      it('should not cancel event bubbling', function () {
        expect(fakeEvent.stopPropagation).to.not.have.been.called()
      })

      it('should not cancel the default key handler', function () {
        expect(fakeEvent.preventDefault).to.not.have.been.called()
      })

      it('should not be deleted', function () {
        expect(onDelete).to.not.have.been.called()
      })

      it('should not call onFinish', function () {
        expect(onFinish).to.not.have.been.called()
      })
    })
  })

  describe('mark position', function () {
    it('should be positioned at {mark.x, mark.y}', function () {
      point.initialPosition({ x: 50, y: 120 })
      wrapper.setProps({ mark: point })
      const transform = wrapper.root().prop('transform')
      expect(transform).to.have.string('translate(50, 120)')
    })

    describe( 'when rotated', function () {
      beforeEach(function () {
        const ellipseTool = EllipseTool.create({
          type: 'ellipse'
        })
        const ellipse = ellipseTool.createMark({
          id: 'ellipse1',
          x: 50,
          y: 120,
          angle: -45
        })
        wrapper.setProps({ mark: ellipse })
      })
      it('should be rotated by mark.angle', function () {
        const transform = wrapper.root().prop('transform')
        expect(transform).to.have.string('rotate(-45)')
      })
    })
  })

  describe('useEffect hook', function () {
    function markWrapper(mark) {
      return (
        <svg>
          <Mark
            label='Point 1'
            mark={mark}
            onDelete={onDelete}
            onFinish={onFinish}
            onSelect={onSelect}
          >
            <Point mark={mark} />
          </Mark>
        </svg>
      )
    }

    describe('with finished mark and no subTaskVisibility', function () {
      let newMark

      before(function () {
        window.scrollTo.resetHistory()
        newMark = pointTool.createMark()
        newMark.finish()
        wrapper = mount(markWrapper(newMark))
      })

      after(function () {
        onFinish.resetHistory()
        window.scrollTo.resetHistory()
      })

      it('should set subtask visibility', function () {
        expect(newMark.subTaskVisibility).to.be.true()
      })

      it('should preserve window scroll position', function () {
        expect(window.scrollTo).to.have.been.calledOnce()
      })
    })

    describe('when the mark is not finished', function () {
      let newMark

      before(function () {
        newMark = pointTool.createMark()
        wrapper = mount(markWrapper(newMark))
      })

      after(function () {
        onFinish.resetHistory()
        window.scrollTo.resetHistory()
      })

      it('should not set subtask visibility', function () {
        expect(newMark.subTaskVisibility).to.be.false()
      })

      it('should not scroll the window',function () {
        expect(window.scrollTo).to.not.have.been.called()
      })
    })

    describe('when the subtask is visible', function () {
      let newMark

      before(function () {
        newMark = pointTool.createMark()
        newMark.setSubTaskVisibility(true)
        wrapper = mount(markWrapper(newMark))
      })

      after(function () {
        onFinish.resetHistory()
        window.scrollTo.resetHistory()
      })

      it('should not change subtask visibility', function () {
        expect(newMark.subTaskVisibility).to.be.true()
      })

      it('should not scroll the window',function () {
        expect(window.scrollTo).to.not.have.been.called()
      })
    })
  })
})
