import { shallow } from 'enzyme'
import { types } from 'mobx-state-tree'
import React from 'react'

import SurveyTask from './SurveyTask'
import { default as Task } from '@plugins/tasks/SurveyTask'
import Chooser from './components/Chooser'

describe('SurveyTask', function () {
  const task = Task.TaskModel.create({
    taskKey: 'T0',
    type: 'survey'
  })
  const annotation = task.defaultAnnotation()

  describe('survey task', function () {
    let wrapper
    
    before(function () {
      wrapper = shallow(
        <SurveyTask
          annotation={annotation}
          task={task}
        />
      )
    })

    it('should render a Chooser component', function () {
      expect(wrapper.find(Chooser)).to.have.lengthOf(1)
    })

    // TODO: add Choice component tests
  })
})
