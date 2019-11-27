import React from 'react'
import { shallow } from 'enzyme'
import { expect } from 'chai'
import sinon from 'sinon'
import SingleChoiceTask from './SingleChoiceTask'

// TODO: move this into a factory
const task = {
  annotation: { task: 'init' },
  answers: [{ label: 'yes' }, { label: 'no' }],
  question: 'Is there a cat?',
  required: true,
  taskKey: 'init',
  type: 'single',
  updateAnnotation: sinon.stub()
}

describe('SingleChoiceTask', function () {
  describe('when it renders', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<SingleChoiceTask addAnnotation={() => {}} task={task} />)
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
      const annotation = { task: task.taskKey, value: 0 }
      wrapper = shallow(
        <SingleChoiceTask
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

  describe('onChange event handler', function () {
    let wrapper
    before(function () {
      wrapper = shallow(<SingleChoiceTask task={task} />)
    })

    afterEach(function () {
      task.updateAnnotation.resetHistory()
    })

    it('should update the annotation', function () {
      task.answers.forEach((answer, index) => {
        const node = wrapper.find({ label: answer.label })
        node.simulate('change', { target: { checked: true } })
        expect(task.updateAnnotation.withArgs(index)).to.have.been.calledOnce()
      })
    })

    it('should not update the annotation if the answer is not checked', function () {
      const node = wrapper.find({ label: task.answers[0].label })
      node.simulate('change', { target: { checked: false } })
      expect(task.updateAnnotation.withArgs(0)).to.not.have.been.called()
    })
  })
})
