import { shallow } from 'enzyme'
import React from 'react'
import sinon from 'sinon'

import { default as Task } from '@plugins/tasks/SurveyTask'
import SurveyTaskContainer from './SurveyTaskContainer'

describe('SurveyTaskContainer', function () {
  let wrapper
  const task = Task.TaskModel.create({
    taskKey: 'T0',
    type: 'survey'
  })
    
  before(function () {
    wrapper = shallow(
      <SurveyTaskContainer
        task={task}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
