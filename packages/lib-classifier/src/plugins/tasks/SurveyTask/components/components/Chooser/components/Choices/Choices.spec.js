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
    let task, wrapper
    before(function () {
      task = Task.TaskModel.create({
        choices: mockTask.choices,
        taskKey: 'T0',
        type: 'survey'
      })
      wrapper = shallow(
        <Choices
          filteredChoices={Array.from(mockTask.choicesOrder)}
          task={task}
        />
      )
    })

    it('should set the set the number of grid columns to 3', function () {
      expect(wrapper.find(Grid).props().columns.count).to.equal(3)
    })
  })

  describe('when the column count is 2', function () {
    let task, wrapper
    before(function () {
      let choices = {}
      let choicesOrder = []
      Object.keys(mockTask.choices).forEach((choiceKey, index) => {
        if (index <=5) {
          choices[choiceKey] = mockTask.choices[index] 
          choicesOrder.push(mockTask.choicesOrder[index])
        }
      })

      task = Task.TaskModel.create({
        choices,
        choicesOrder,
        taskKey: 'T0',
        type: 'survey'
      })
      wrapper = shallow(
        <Choices
          filteredChoices={choicesOrder}
          task={task}
        />
      )
    })

    it('should set the set the number of grid columns to 2', function () {
      expect(wrapper.find(Grid).props().columns.count).to.equal(2)
    })
  })

  describe('when the column count is 1', function () {
    let task, wrapper
    before(function () {
      let choices = {}
      let choicesOrder = []
      Object.keys(mockTask.choices).forEach((choiceKey, index) => {
        if (index <= 4) {
          choices[choiceKey] = mockTask.choices[index]
          choicesOrder.push(mockTask.choicesOrder[index])
        }
      })

      task = Task.TaskModel.create({
        choices,
        choicesOrder,
        taskKey: 'T0',
        type: 'survey'
      })
      wrapper = shallow(
        <Choices
          filteredChoices={choicesOrder}
          task={task}
        />
      )
    })

    it('should set the set the number of grid columns to 1', function () {
      expect(wrapper.find(Grid).props().columns.count).to.equal(1)
    })
  })
})
