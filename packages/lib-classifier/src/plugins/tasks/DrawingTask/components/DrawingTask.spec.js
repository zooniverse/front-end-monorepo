import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import DrawingTask from './DrawingTask'
import TaskInput from '../../components/TaskInput'

// TODO: move to factory
const task = {
  activeToolIndex: 0,
  help: 'Help content.',
  instruction: 'Draw something.',
  taskKey: 'T0',
  tools: [{
    label: 'Line',
    max: 3,
    type: 'line',
    marks: {
      size: 0
    }
  }, {
    label: 'Point',
    min: 1,
    type: 'point',
    marks: {
      size: 0
    }
  }],
  type: 'drawing',
  setActiveTool: sinon.stub()
}

describe('DrawingTask', function () {
  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<DrawingTask task={task} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should have instructions', function () {
      expect(wrapper.contains(task.instruction)).to.be.true()
    })

    it('should render TaskInput per the number of tools', function () {
      expect(wrapper.find(TaskInput)).to.have.lengthOf(task.tools.length)
    })

    it('should set the TaskInput checked prop using the active prop', function () {
      expect(wrapper.find(TaskInput).first().props().checked).to.be.true()
      expect(wrapper.find(TaskInput).last().props().checked).to.be.false()
    })
  })
})
