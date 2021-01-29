import { shallow } from 'enzyme'
import { types } from 'mobx-state-tree'
import React from 'react'
import { Grid } from 'grommet'
import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'

import { default as Task } from '@plugins/tasks/SurveyTask'
import Choices from './Choices'

describe.only('Component > Choices', function () {
  let wrapper
  let task = Task.TaskModel.create({
    taskKey: 'T0',
    type: 'survey'
  })
  const annotation = task.defaultAnnotation()

  before(function () {
    types.model('MockStore', {
      annotation: Task.AnnotationModel,
      task: Task.TaskModel
    })
      .create({
        annotation,
        task
      })
    task.setAnnotation(annotation)

    wrapper = shallow(
      <Choices
        task={task}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('when the column count is 3', function () {
    it('should set the set the number of grid columns to 3', function () {
      task = Task.TaskModel.create({
        choices: mockTask.choices,
        taskKey: 'T0',
        type: 'survey'
      })

      expect(wrapper.find(Grid).props().columns.count).to.equal(3)
    })
  })
})
