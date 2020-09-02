import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import { MultipleChoiceTask } from './MultipleChoiceTask'
import { default as Task } from '@plugins/tasks/MultipleChoiceTask'

describe('MultipleChoiceTask', function () {
  const task = Task.TaskModel.create({
    answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
    question: 'What is/are the cat(s) doing?',
    required: '',
    taskKey: 'T1',
    type: 'multiple'
  })

  const annotation = task.defaultAnnotation

  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<MultipleChoiceTask annotation={annotation} task={task} />)
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
      annotation.update([0])
      wrapper = shallow(
        <MultipleChoiceTask
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

  describe('onChange', function () {
    let wrapper
    beforeEach(function () {
      annotation.update([])
      wrapper = shallow(
        <MultipleChoiceTask
          annotation={annotation}
          task={task}
        />
      )
    })

    it('should update the annotation', function () {
      const expectedValue = []
      task.answers.forEach((answer, index) => {
        const node = wrapper.find({ label: answer.label })
        node.simulate('change', { target: { checked: true } })
        expectedValue.push(index)
        expect(annotation.value).to.deep.equal(expectedValue)
      })
    })

    it('should add checked answers to the annotation value', function () {
      const firstNode = wrapper.find({ label: task.answers[0].label })
      firstNode.simulate('change', { target: { checked: true } })
      expect(annotation.value).to.deep.equal([0])
      const lastNode = wrapper.find({ label: task.answers[2].label })
      lastNode.simulate('change', { target: { checked: true } })
      expect(annotation.value).to.deep.equal([0, 2])
    })

    it('should remove unchecked answers from the annotation value', function () {
      const firstNode = wrapper.find({ label: task.answers[0].label })
      firstNode.simulate('change', { target: { checked: true } })
      expect(annotation.value).to.deep.equal([0])
      firstNode.simulate('change', { target: { checked: false } })
      expect(annotation.value).to.deep.equal([])
    })
  })
})
