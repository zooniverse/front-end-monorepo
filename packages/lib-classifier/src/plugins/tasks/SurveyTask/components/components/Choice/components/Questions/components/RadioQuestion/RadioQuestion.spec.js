import { shallow } from 'enzyme'
import { RadioButtonGroup } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import RadioQuestion from './RadioQuestion'

describe('Component > RadioQuestion', function () {
  let wrapper, handleAnswerSpy
  const questionId = 'HWMN'
  const question = mockTask.questions[questionId]
  const options = question.answersOrder.map(answerId => ({
    label: question.answers[answerId].label,
    value: answerId
  }))

  before(function () {
    handleAnswerSpy = sinon.spy()
    wrapper = shallow(
      <RadioQuestion
        handleAnswer={handleAnswerSpy}
        options={options}
        questionId={questionId}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a RadioButtonGroup', function () {
    expect(wrapper.find(RadioButtonGroup)).to.have.lengthOf(1)
  })

  it('should call handleAnswer with new answer on RadioButtonGroup change', function () {
    expect(handleAnswerSpy).to.not.have.been.called()

    wrapper.find(RadioButtonGroup).simulate('change', { target: { value: '3' } })
    expect(handleAnswerSpy).to.have.been.calledWith('3', 'HWMN')

    handleAnswerSpy.resetHistory()
  })

  it('should render the chosen value', function () {
    wrapper.setProps({ questionAnswer: '9' })
    expect(wrapper.find(RadioButtonGroup).props().value).to.equal('9')
  })
})
