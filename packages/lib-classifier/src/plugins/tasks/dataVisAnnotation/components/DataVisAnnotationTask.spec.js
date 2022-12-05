import { shallow } from 'enzyme'
import { expect } from 'chai'
import { default as Task } from '@plugins/tasks/dataVisAnnotation'
import DataVisAnnotationTask from './DataVisAnnotationTask'
import TaskInput from '../../components/TaskInput'

describe('DataVisAnnotationTask', function () {
  // TODO: move this into a factory
  const taskSnapshot = {
    activeToolIndex: 0,
    taskKey: 'T101',
    strings: {
      help: '',
      instruction: 'Mark an area of the graph that is interesting.',
      'tools.0.label': 'Transit?'
    },
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

  const task = Task.TaskModel.create(taskSnapshot)

  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<DataVisAnnotationTask task={task} />)
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

    it('should select the active tool', function () {
      expect(wrapper.find(TaskInput).first().props().checked).to.be.true()
      expect(wrapper.find(TaskInput).last().props().checked).to.be.false()
    })
  })
})
