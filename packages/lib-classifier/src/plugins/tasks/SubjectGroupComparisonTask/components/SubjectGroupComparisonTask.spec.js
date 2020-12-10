import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import SubjectGroupComparisonTask from './SubjectGroupComparisonTask'
import { default as Task } from '@plugins/tasks/SubjectGroupComparisonTask'

describe('SubjectGroupComparisonTask', function () {
  const task = Task.TaskModel.create({
    question: 'Please select the cells that look weird.',
    required: true,
    taskKey: 'init',
    type: 'subjectGroupComparison'
  })
  const annotation = task.defaultAnnotation()

  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<SubjectGroupComparisonTask annotation={annotation} task={task} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should have a question', function () {
      expect(wrapper.contains(task.question)).to.be.true()
    })
  })
})
