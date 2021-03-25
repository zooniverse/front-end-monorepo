import { shallow } from 'enzyme'
import { Drop } from 'grommet'
import React from 'react'

import { default as Task } from '@plugins/tasks/SurveyTask'
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

  it('should render a Chooser component', function () {
    expect(wrapper.find(Chooser)).to.have.lengthOf(1)
  })

  describe.skip('with selectedChoice', function () {
    before(function () {
      wrapper = shallow(
        <SurveyTask
          selectedChoice='HPPPTMS'
          task={task}
        />
      )
    })

    it('should render a Drop component', function () {
      expect(wrapper.find(Drop)).to.have.lengthOf(1)
    })

    it('should render a Choice component with selectedChoice', function () {
      expect(wrapper.find(Choice)).to.have.lengthOf(1)
      expect(wrapper.find(Choice).props().choiceId).to.equal('HPPPTMS')
    })
  })
})
