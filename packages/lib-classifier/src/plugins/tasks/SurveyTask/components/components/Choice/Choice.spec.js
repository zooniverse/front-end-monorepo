import { shallow } from 'enzyme'
import { Carousel } from 'grommet'
import { types } from 'mobx-state-tree'
import React from 'react'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import { default as Task } from '@plugins/tasks/SurveyTask'
import Choice from './Choice'
import Questions from './components/Questions'

describe('Component > Choice', function () {
  let wrapper
  let task = Task.TaskModel.create({
    choices: mockTask.choices,
    images: mockTask.images,
    questions: mockTask.questions,
    questionsMap: mockTask.questionsMap,
    questionsOrder: mockTask.questionsOrder,
    taskKey: 'T0',
    type: 'survey'
  })

  before(function () {
    types.model('MockStore', {
      task: Task.TaskModel
    })
      .create({
        task
      })

    wrapper = shallow(
      <Choice
        choiceId='CRCL'
        task={task}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  it('should not render Carousel with choice without images', function () {
    wrapper.setProps({ choiceId: 'HMN' })
    expect(wrapper.find(Carousel)).to.have.lengthOf(0)
  })

  it('should render Carousel with choice with images', function () {
    wrapper.setProps({ choiceId: 'CRCL' })
    expect(wrapper.find(Carousel)).to.have.lengthOf(1)
  })

  it('should not render Questions with choice without questions', function () {
    wrapper.setProps({ choiceId: 'FR' })
    expect(wrapper.find(Questions)).to.have.lengthOf(0)
  })

  it('should render Questions with choice with questions', function () {
    wrapper.setProps({ choiceId: 'CRCL' })
    expect(wrapper.find(Questions)).to.have.lengthOf(1)
  })

  // TODO: add tests for Identify button disabled prop once state passed down as prop
})
