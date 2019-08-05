import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import DataVisAnnotationTask from './DataVisAnnotationTask'
import TaskInput from '../TaskInput'

// TODO: move this into a factory
const task = {
  instruction: 'Mark an area of the graph that is interesting.',
  taskKey: 'T101',
  tools: [{
    help: '',
    label: 'Transit?',
    max: 20,
    type: 'graph2dRangeX'
  }, {
    help: '',
    label: 'Transit?',
    max: 20,
    type: 'graph2dRangeX'
  }],
  type: 'dataVisAnnotation'
}

describe('DataVisAnnotationTask', function () {
  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<DataVisAnnotationTask.wrappedComponent active={0} addAnnotation={() => {}} task={task} />)
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
