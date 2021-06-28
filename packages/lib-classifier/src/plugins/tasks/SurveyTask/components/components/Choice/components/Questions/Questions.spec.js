import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import Questions from './Questions'
import CheckBoxInputs from './components/CheckBoxInputs'
import RadioInputs from './components/RadioInputs'

describe('Component > Questions', function () {
  let wrapper, setAnswersSpy, checkboxes, radioButtons
  const questionIds = ['HWMN', 'WHTBHVRSDS', 'RTHRNNGPRSNT']
  before(function () {
    setAnswersSpy = sinon.spy()
    wrapper = shallow(
      <Questions
        answers={{}}
        hasFocus
        questionIds={questionIds}
        questions={mockTask.questions}
        setAnswers={setAnswersSpy}
      />
    )
    checkboxes = wrapper.find(CheckBoxInputs)
    radioButtons = wrapper.find(RadioInputs)
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should render the appropriate input groups', function () {
    expect(checkboxes).to.have.lengthOf(1)
    expect(radioButtons).to.have.lengthOf(2)
  })

  it('should pass the chosen answers for each input group', function () {
    wrapper.setProps({ answers: { WHTBHVRSDS: ['RSTNG', 'TNG'], HWMN: '9' } })
    checkboxes = wrapper.find(CheckBoxInputs)
    radioButtons = wrapper.find(RadioInputs)

    expect(checkboxes.find({ questionId: 'WHTBHVRSDS' }).props().questionAnswer).to.deep.equal(['RSTNG', 'TNG'])
    expect(radioButtons.find({ questionId: 'HWMN' }).props().questionAnswer).to.equal('9')
    expect(radioButtons.find({ questionId: 'RTHRNNGPRSNT' }).props().questionAnswer).to.be.undefined()
  })

  describe('with hasFocus of true', function () {
    it('should have the first inputs component with hasFocus true', function () {
      // per the survey task questionsOrder the first inputs component is HWMN (How many?)

      expect(radioButtons.find({ questionId: 'HWMN' }).props().hasFocus).to.be.true()
    })

    it('should have other inputs components with hasFocus false', function () {
      expect(checkboxes.find({ questionId: 'WHTBHVRSDS' }).props().hasFocus).to.be.false()
      expect(radioButtons.find({ questionId: 'RTHRNNGPRSNT' }).props().hasFocus).to.be.false()
    })
  })
})
