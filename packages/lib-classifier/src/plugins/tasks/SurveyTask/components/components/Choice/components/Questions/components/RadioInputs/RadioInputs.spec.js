import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import RadioInputs from './RadioInputs'
import RadioInput from './components/RadioInput'

describe('Component > RadioInputs', function () {
  let wrapper, handleAnswerSpy
  const questionId = 'RTHRNNGPRSNT'
  const question = mockTask.questions[questionId]
  const options = question.answersOrder.map(answerId => ({
    label: question.answers[answerId].label,
    value: answerId
  }))

  before(function () {
    handleAnswerSpy = sinon.spy()
    wrapper = shallow(
      <RadioInputs
        handleAnswer={handleAnswerSpy}
        options={options}
        questionId={questionId}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render 2 RadioInput components', function () {
    expect(wrapper.find(RadioInput)).to.have.lengthOf(options.length)
  })

  describe('with defined answer', function () {
    let inputs

    before(function () {
      wrapper.setProps({ questionAnswer: 'S' })
      inputs = wrapper.find(RadioInput)
    })

    it('should render chosen RadioInput as checked', function () {
      expect(inputs.find({ option: { label: 'Yes', value: 'S' } }).props().isChecked).to.be.true()
    })

    it('should render unchosen RadioInputs as unchecked', function () {
      expect(inputs.find({ option: { label: ' No', value: 'N' } }).props().isChecked).to.be.false()
    })
  })
})
