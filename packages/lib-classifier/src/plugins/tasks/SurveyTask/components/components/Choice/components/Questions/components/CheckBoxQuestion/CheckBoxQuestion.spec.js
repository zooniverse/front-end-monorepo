import { shallow } from 'enzyme'
import { CheckBoxGroup } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import CheckBoxQuestion from './CheckBoxQuestion'

describe('Component > CheckBoxQuestion', function () {
  let wrapper, handleAnswerSpy
  const questionId = 'WHTBHVRSDS'
  const question = mockTask.questions[questionId]
  const labels = question.answersOrder.map(answerId => ({
    label: question.answers[answerId].label,
    value: answerId
  }))

  before(function () {
    handleAnswerSpy = sinon.spy()
    wrapper = shallow(
      <CheckBoxQuestion
        handleAnswer={handleAnswerSpy}
        labels={labels}
        questionId={questionId}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render a CheckBoxGroup', function () {
    expect(wrapper.find(CheckBoxGroup)).to.have.lengthOf(1)
  })

  it('should call handleAnswer with new answer on CheckBoxGroup change', function () {
    expect(handleAnswerSpy).to.not.have.been.called()

    wrapper.find(CheckBoxGroup).at(0).simulate('change', { value: ['RSTNG'] })
    expect(handleAnswerSpy).to.have.been.calledWith(['RSTNG'], 'WHTBHVRSDS')

    wrapper.find(CheckBoxGroup).at(0).simulate('change', { value: ['RSTNG', 'TNG'] })
    expect(handleAnswerSpy).to.have.been.calledWith(['RSTNG', 'TNG'], 'WHTBHVRSDS')

    handleAnswerSpy.resetHistory()
  })

  it('should render the chosen value', function () {
    wrapper.setProps({ value: ['RSTNG', 'TNG'] })
    expect(wrapper.find(CheckBoxGroup).props().value).to.deep.equal(['RSTNG', 'TNG'])
  })
})
