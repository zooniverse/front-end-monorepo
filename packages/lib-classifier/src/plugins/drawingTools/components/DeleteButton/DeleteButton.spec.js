import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import { Point } from '@plugins/drawingTools/models/marks'
import DeleteButton from './DeleteButton'

describe('Drawing tools > Delete button', function () {
  const mark = Point.create({ id: 'point1', x: 50, y: 50 })

  it('should render without crashing', function () {
    const wrapper = shallow(<DeleteButton label='Delete' mark={mark} />)
    expect(wrapper).to.be.ok()
  })

  it('should be positioned by its mark', function () {
    const { x, y } = mark.deleteButtonPosition(1)
    const wrapper = shallow(<DeleteButton label='Delete' mark={mark} />)
    const transform = wrapper.root().prop('transform')
    expect(transform).to.have.string(`translate(${x}, ${y})`)
  })

  describe('on pointer down', function () {
    it('should call onDelete', function () {
      const fakeEvent = new Event('pointerdown')
      const onDelete = sinon.stub()
      const wrapper = shallow(<DeleteButton label='Delete' mark={mark} onDelete={onDelete} />)
      wrapper.simulate('pointerdown', fakeEvent)
      expect(onDelete).to.have.been.calledOnce()
    })
  })

  describe('on key down', function () {
    it('should call onDelete for Enter', function () {
      const fakeEvent = new Event('keydown')
      fakeEvent.key = 'Enter'
      const onDelete = sinon.stub()
      const wrapper = shallow(<DeleteButton label='Delete' mark={mark} onDelete={onDelete} />)
      wrapper.simulate('keydown', fakeEvent)
      expect(onDelete).to.have.been.calledOnce()
    })

    it('should call onDelete for space', function () {
      const fakeEvent = new Event('keydown')
      fakeEvent.key = ' '
      const onDelete = sinon.stub()
      const wrapper = shallow(<DeleteButton label='Delete' mark={mark} onDelete={onDelete} />)
      wrapper.simulate('keydown', fakeEvent)
      expect(onDelete).to.have.been.calledOnce()
    })

    it('should ignore any other key', function () {
      const fakeEvent = new Event('keydown')
      fakeEvent.key = 'Tab'
      const onDelete = sinon.stub()
      const wrapper = shallow(<DeleteButton label='Delete' mark={mark} onDelete={onDelete} />)
      wrapper.simulate('keydown', fakeEvent)
      expect(onDelete).to.have.not.been.called()
    })
  })
})
