import { shallow } from 'enzyme'
import { CheckBoxGroup } from 'grommet'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import Questions from './Questions'
import RadioQuestion from './components/RadioQuestion'

describe('Component > Questions', function () {
  let wrapper, setAnswersSpy, checkboxes, radioButtons
  const questionIds = ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT']
  before(function () {
    setAnswersSpy = sinon.spy()
    wrapper = shallow(
      <Questions
        answers={{}}
        questionIds={questionIds}
        questions={mockTask.questions}
        setAnswers={setAnswersSpy}
      />
    )
    checkboxes = wrapper.find(CheckBoxGroup)
    radioButtons = wrapper.find(RadioQuestion)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the appropriate input groups', function () {
    expect(checkboxes).to.have.lengthOf(1)
    expect(radioButtons).to.have.lengthOf(2)
  })

  it('should call setAnswers with new answers on CheckBoxGrounp change', function () {
    expect(setAnswersSpy).to.not.have.been.called()

    checkboxes.at(0).simulate('change', { value: ['RSTNG'] })
    expect(setAnswersSpy).to.have.been.calledWith({ WHTBHVRSDS: ['RSTNG'] })

    checkboxes.at(0).simulate('change', { value: ['RSTNG', 'TNG'] })
    expect(setAnswersSpy).to.have.been.calledWith({ WHTBHVRSDS: ['RSTNG', 'TNG'] })

    setAnswersSpy.resetHistory()
  })

  it('should render the chosen values for each input group', function () {
    wrapper.setProps({ answers: { WHTBHVRSDS: ['RSTNG', 'TNG'], HWMN: '9' } })
    checkboxes = wrapper.find(CheckBoxGroup)
    radioButtons = wrapper.find(RadioQuestion)

    expect(checkboxes.find({ name: 'WHTBHVRSDS' }).props().value).to.deep.equal(['RSTNG', 'TNG'])
    expect(radioButtons.find({ questionId: 'HWMN' }).props().value).to.equal('9')
    expect(radioButtons.find({ questionId: 'RTHRNNGPRSNT' }).props().value).to.be.undefined()
  })
})
