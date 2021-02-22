import { shallow } from 'enzyme'
import { types } from 'mobx-state-tree'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import { default as Task } from '@plugins/tasks/SurveyTask'

import FilterStatus from './FilterStatus'

describe('Component > FilterStatus', function () {
  let wrapper
  let task = Task.TaskModel.create({
    characteristics: mockTask.characteristics,
    characteristicsOrder: mockTask.characteristicsOrder,
    images: mockTask.images,
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
      <FilterStatus
        task={task}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
