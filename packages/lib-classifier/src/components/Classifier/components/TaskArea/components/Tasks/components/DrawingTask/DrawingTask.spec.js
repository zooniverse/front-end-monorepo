import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import DrawingTask from './DrawingTask'
import TaskInputField from '../TaskInputField'

// TODO: move this into a factory
const task = {
  help: 'Help content.',
  instruction: 'Draw something.',
  taskKey: 'T0',
  tools: [{
    label: 'Line',
    max: 3,
    type: 'line'
  }, {
    label: 'Point',
    min: 1,
    type: 'point'
  }],
  type: 'drawing'
}

describe('DrawingTask', function () {
  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<DrawingTask.wrappedComponent active={0} addAnnotation={() => {}} task={task} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok
    })

    it('should have instructions', function () {
      expect(wrapper.contains(task.instruction)).to.be.true
    })

    it('should render TaskInputField per the number of tools', function () {
      expect(wrapper.find(TaskInputField)).to.have.lengthOf(task.tools.length)
    })

    it('should set the TaskInputField checked prop using the active prop', function () {
      expect(wrapper.find(TaskInputField).first().props().checked).to.be.true
      expect(wrapper.find(TaskInputField).last().props().checked).to.be.false
    })
  })
})
