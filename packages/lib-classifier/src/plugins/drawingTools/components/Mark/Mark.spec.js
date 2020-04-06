import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { EllipseTool, PointTool } from '@plugins/drawingTools/models/tools'
import { Mark } from './Mark'
import Point from '../Point'

describe('Drawing tools > drawing tool root', function () {
  const pointTool = PointTool.create({
    type: 'point'
  })
  const point = pointTool.createMark({
    id: 'point1'
  })
  const onDelete = sinon.stub()
  const onDeselect = sinon.stub()
  const onSelect = sinon.stub()
  let wrapper

  beforeEach(function () {
    wrapper = shallow(
      <Mark
        label='Point 1'
        mark={point}
        onDelete={onDelete}
        onDeselect={onDeselect}
        onSelect={onSelect}
      >
        <Point mark={point} />
      </Mark>
    )
  })

  after(function () {
    onDeselect.resetHistory()
    onSelect.resetHistory()
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

  describe('on blur', function () {
    before(function () {
      wrapper.simulate('blur')
    })

    it('should be deselected', function () {
      expect(onDeselect).to.have.been.calledOnce()
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

    describe('with other keys', function () {
      const fakeEvent = {
        key: 'Tab',
        preventDefault: sinon.stub(),
        stopPropagation: sinon.stub()
      }
      before(function () {
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
})
