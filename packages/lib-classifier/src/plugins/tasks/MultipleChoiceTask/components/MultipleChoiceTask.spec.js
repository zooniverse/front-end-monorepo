import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import MultipleChoiceTask from './MultipleChoiceTask'

// TODO: move this into a factory
const task = {
  annotation: { task: 'T1', value: [] },
  answers: [{ label: 'napping' }, { label: 'standing' }, { label: 'playing' }],
  question: 'What is/are the cat(s) doing?',
  required: false,
  taskKey: 'T1',
  type: 'multiple',
  updateAnnotation: sinon.stub().callsFake(value => {
    task.annotation.value = value
  })
}

describe('MultipleChoiceTask', function () {
  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<MultipleChoiceTask task={task} />)
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
      const annotation = { task: task.taskKey, value: [0] }
      wrapper = shallow(
        <MultipleChoiceTask
          task={Object.assign({}, task, { annotation })}
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
      const annotation = { task: task.taskKey, value: [] }
      wrapper = shallow(
        <MultipleChoiceTask
          task={Object.assign({}, task, { annotation })}
        />
      )
    })

    afterEach(function () {
      task.updateAnnotation.resetHistory()
    })

    it('should update the annotation', function () {
      const expectedValue = []
      task.answers.forEach((answer, index) => {
        const node = wrapper.find({ label: answer.label })
        node.simulate('change', { target: { checked: true } })
        wrapper.setProps({ task })
        expectedValue.push(index)
        expect(task.annotation.value).to.deep.equal(expectedValue)
      })
    })

    it('should add checked answers to the annotation value', function () {
      const firstNode = wrapper.find({ label: task.answers[0].label })
      firstNode.simulate('change', { target: { checked: true } })
      wrapper.setProps({ task })
      expect(task.annotation.value).to.deep.equal([0])
      const lastNode = wrapper.find({ label: task.answers[2].label })
      lastNode.simulate('change', { target: { checked: true } })
      wrapper.setProps({ task })
      expect(task.annotation.value).to.deep.equal([0, 2])
    })

    it('should remove unchecked answers from the annotation value', function () {
      const firstNode = wrapper.find({ label: task.answers[0].label })
      firstNode.simulate('change', { target: { checked: true } })
      wrapper.setProps({ task })
      expect(task.annotation.value).to.deep.equal([0])
      firstNode.simulate('change', { target: { checked: false } })
      wrapper.setProps({ task })
      expect(task.annotation.value).to.deep.equal([])
    })
  })
})
