import { shallow } from 'enzyme'
import { types } from 'mobx-state-tree'
import React from 'react'
import sinon from 'sinon'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import { default as Task } from '@plugins/tasks/SurveyTask'
import Choice from './Choice'

describe('Component > Choice', function () {
  let wrapper, onCancelSpy
  let task = Task.TaskModel.create({
    choices: mockTask.choices,
    images: mockTask.images,
    questions: mockTask.questions,
    questionsMap: mockTask.questionsMap,
    questionsOrder: mockTask.questionsOrder,
    taskKey: 'T0',
    type: 'survey'
  })
  const annotation = task.defaultAnnotation()

  before(function () {
    onCancelSpy = sinon.spy()
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
      <Choice
        choiceId='CRCL'
        onCancel={onCancelSpy}
        task={task}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })
})
