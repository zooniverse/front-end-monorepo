import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'

import { default as Task } from '@plugins/tasks/drawing'
import DrawingTask from './DrawingTask'
import TaskInput from '../../components/TaskInput'

describe('DrawingTask', function () {
  // TODO: move to factory
  const task = Task.TaskModel.create({
    activeToolIndex: 0,
    help: 'Help content.',
    strings: {
      instruction: 'Draw something.',
      'tools.0.label': 'Line',
      'tools.1.label': 'Point'
    },
    taskKey: 'T0',
    tools: [{
      max: 3,
      type: 'line'
    }, {
      min: 1,
      type: 'point'
    }],
    type: 'drawing',
    setActiveTool: sinon.stub()
  })

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
