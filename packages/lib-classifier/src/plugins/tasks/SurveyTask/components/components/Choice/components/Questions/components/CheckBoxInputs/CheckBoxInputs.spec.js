import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import CheckBoxInputs from './CheckBoxInputs'
import CheckBoxInput from './components/CheckBoxInput'

describe('Component > CheckBoxInputs', function () {
  let wrapper, handleAnswerSpy
  const questionId = 'WHTBHVRSDS'
  const question = mockTask.questions[questionId]
  const options = question.answersOrder.map(answerId => ({
    label: question.answers[answerId].label,
    value: answerId
  }))

  before(function () {
    handleAnswerSpy = sinon.spy()
    wrapper = shallow(
      <CheckBoxInputs
        handleAnswer={handleAnswerSpy}
        hasFocus
        options={options}
        questionId={questionId}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render 5 CheckBoxInput components', function () {
    expect(wrapper.find(CheckBoxInput)).to.have.lengthOf(options.length)
  })

  describe('with defined answer', function () {
    let inputs

    before(function () {
      wrapper.setProps({ questionAnswer: ['RSTNG', 'TNG'] })
      inputs = wrapper.find(CheckBoxInput)
    })

    it('should render chosen CheckBoxInputs as checked', function () {
      expect(inputs.find({ option: { label: 'Resting', value: 'RSTNG' } }).props().isChecked).to.be.true()
      expect(inputs.find({ option: { label: ' Eating', value: 'TNG' } }).props().isChecked).to.be.true()
    })

    it('should render not chosen CheckBoxInputs as unchecked', function () {
      expect(inputs.find({ option: { label: ' Standing', value: 'STNDNG' } }).props().isChecked).to.be.false()
      expect(inputs.find({ option: { label: ' Moving', value: 'MVNG' } }).props().isChecked).to.be.false()
      expect(inputs.find({ option: { label: ' Interacting', value: 'NTRCTNG' } }).props().isChecked).to.be.false()
    })
  })

  describe('with hasFocus true', function () {
    let inputs

    before(function () {
      inputs = wrapper.find(CheckBoxInput)
    })

    // per the question ('WHTBHVRSDS') answersOrder 'RSTNG' is the first input

    it('should have the first CheckBoxInput with hasFocus true', function () {
      expect(inputs.find({ option: { label: 'Resting', value: 'RSTNG' } }).props().hasFocus).to.be.true()
    })

    it('should have other CheckBoxInputs with hasFocus false', function () {
      expect(inputs.find({ option: { label: ' Eating', value: 'TNG' } }).props().hasFocus).to.be.false()
      expect(inputs.find({ option: { label: ' Standing', value: 'STNDNG' } }).props().hasFocus).to.be.false()
      expect(inputs.find({ option: { label: ' Moving', value: 'MVNG' } }).props().hasFocus).to.be.false()
      expect(inputs.find({ option: { label: ' Interacting', value: 'NTRCTNG' } }).props().hasFocus).to.be.false()
    })
  })
})
