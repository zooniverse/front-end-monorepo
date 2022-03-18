import { shallow } from 'enzyme'
import React from 'react'
import { default as Task } from '@plugins/tasks/survey'
import Choice from './components/Choice'
import Chooser from './components/Chooser'
import SurveyTask from './SurveyTask'

describe('SurveyTask', function () {
  let wrapper
  const task = Task.TaskModel.create({
    taskKey: 'T0',
    type: 'survey'
  })

  before(function () {
    wrapper = shallow(
      <SurveyTask
        task={task}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('without selectedChoice', function () {
    it('should render a Chooser component', function () {
      expect(wrapper.find(Chooser)).to.have.lengthOf(1)
    })

    it('should not render a Choice component', function () {
      expect(wrapper.find(Choice)).to.have.lengthOf(0)
    })
  })

  describe('with selectedChoice', function () {
    before(function () {
      wrapper.setProps({ selectedChoice: 'HPPPTMS' })
    })

    it('should render a Choice component with selectedChoice', function () {
      expect(wrapper.find(Choice)).to.have.lengthOf(1)
      expect(wrapper.find(Choice).props().choiceId).to.equal('HPPPTMS')
    })

    it('should not render a Chooser component', function () {
      expect(wrapper.find(Chooser)).to.have.lengthOf(0)
    })
  })
})
