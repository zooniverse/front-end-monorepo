import { shallow } from 'enzyme'
import { CheckBoxGroup, RadioButtonGroup } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import Questions from './Questions'
import { expect } from 'chai'

describe('Component > Questions', function () {
  let wrapper, setAnswersSpy

  before(function () {
    setAnswersSpy = sinon.spy()
    wrapper = shallow(
      <Questions
        answers={{}}
        questionIds={['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT']}
        questions={mockTask.questions}
        setAnswers={setAnswersSpy}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the appropriate input groups', function () {
    expect(wrapper.find(CheckBoxGroup)).to.have.lengthOf(1)
    expect(wrapper.find(RadioButtonGroup)).to.have.lengthOf(2)
  })

  it('should call setAnswers with new answers on CheckBoxGrounp change', function () {
    expect(setAnswersSpy).to.not.have.been.called()

    wrapper.find(CheckBoxGroup).at(0).simulate('change', { value: ['RSTNG'] })
    expect(setAnswersSpy).to.have.been.calledWith({ WHTBHVRSDS: ['RSTNG'] })

    wrapper.find(CheckBoxGroup).at(0).simulate('change', { value: ['RSTNG', 'TNG'] })
    expect(setAnswersSpy).to.have.been.calledWith({ WHTBHVRSDS: ['RSTNG', 'TNG'] })

    setAnswersSpy.resetHistory()
  })

  it('should call setAnswers with new answers on RadioButtonGroup change', function () {
    expect(setAnswersSpy).to.not.have.been.called()

    wrapper.find(RadioButtonGroup).at(0).simulate('change', { target: { value: '3' }})
    expect(setAnswersSpy).to.have.been.calledWith({ HWMN: '3' })

    wrapper.find(RadioButtonGroup).at(0).simulate('change', { target: { value: '9' }})
    expect(setAnswersSpy).to.have.been.calledWith({ HWMN: '9' })

    setAnswersSpy.resetHistory()
  })
})
