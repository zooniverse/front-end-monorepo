import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import SingleChoiceTask from './SingleChoiceTask'
import { default as Task } from '@plugins/tasks/SingleChoiceTask'

describe('SingleChoiceTask', function () {
  const task = Task.TaskModel.create({
    answers: [{ label: 'yes' }, { label: 'no' }],
    question: 'Is there a cat?',
    required: 'true',
    taskKey: 'init',
    type: 'single'
  })
  const annotation = task.defaultAnnotation

  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<SingleChoiceTask annotation={annotation} task={task} />)
    })

    it('should render without crashing', function () {
      expect(wrapper).to.be.ok()
    })

    it('should have a question', function () {
      expect(wrapper.contains(task.question)).to.be.true()
    })

    it('should render the correct number of answer choices', function () {
      task.answers.forEach((answer) => {
        expect(wrapper.find({ label: answer.label })).to.have.lengthOf(1)
      })
    })
  })

  describe('with an annotation', function () {
    let wrapper

    before(function () {
      annotation.update(0)
      wrapper = shallow(
        <SingleChoiceTask
          annotation={annotation}
          task={task}
        />
      )
    })

    it('should check the selected answer', function () {
      const answer = task.answers[0]
      const input = wrapper.find({ label: answer.label })
      expect(input.prop('checked')).to.be.true()
    })
  })

  describe('onChange event handler', function () {
    let wrapper
    beforeEach(function () {
      annotation.update(null)
      wrapper = shallow(<SingleChoiceTask annotation={annotation} task={task} />)
    })

    it('should update the annotation', function () {
      task.answers.forEach((answer, index) => {
        const node = wrapper.find({ label: answer.label })
        node.simulate('change', { target: { checked: true } })
        expect(annotation.value).to.equal(index)
      })
    })

    it('should not update the annotation if the answer is not checked', function () {
      const node = wrapper.find({ label: task.answers[1].label })
      node.simulate('change', { target: { checked: false } })
      expect(annotation.value).to.be.null()
    })
  })
})
