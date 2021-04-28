import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import CheckBoxQuestion from './CheckBoxQuestion'
import CheckBoxOption from './components/CheckBoxOption'

describe('Component > CheckBoxQuestion', function () {
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
      <CheckBoxQuestion
        handleAnswer={handleAnswerSpy}
        options={options}
        questionId={questionId}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render CheckBoxOptions', function () {
    expect(wrapper.find(CheckBoxOption)).to.have.lengthOf(options.length)
  })

  describe('with defined answer', function () {
    let checkBoxOptions

    before(function () {
      wrapper.setProps({ questionAnswer: ['RSTNG', 'TNG'] })
      checkBoxOptions = wrapper.find(CheckBoxOption)
    })

    it('should render chosen CheckBoxOptions as checked', function () {
      expect(checkBoxOptions.find({ option: { label: 'Resting', value: 'RSTNG' } }).props().isChecked).to.be.true()
      expect(checkBoxOptions.find({ option: { label: 'Eating', value: 'TNG' } }).props().isChecked).to.be.true()
    })

    it('should render not chosen CheckBoxOptions as unchecked', function () {
      expect(checkBoxOptions.find({ option: { label: 'Standing', value: 'STNDNG' } }).props().isChecked).to.be.false()
      expect(checkBoxOptions.find({ option: { label: 'Moving', value: 'MVNG' } }).props().isChecked).to.be.false()
      expect(checkBoxOptions.find({ option: { label: 'Interacting', value: 'NTRCTNG' } }).props().isChecked).to.be.false()
    })
  })
})
