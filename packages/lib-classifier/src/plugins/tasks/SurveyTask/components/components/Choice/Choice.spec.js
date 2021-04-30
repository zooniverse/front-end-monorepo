import { shallow } from 'enzyme'
import { Button, Carousel } from 'grommet'
import { types } from 'mobx-state-tree'
import React from 'react'
import sinon from 'sinon'
import { PrimaryButton } from '@zooniverse/react-components'

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

  const onCancelSpy = sinon.spy()
  const onIdentifySpy = sinon.spy()

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
        onCancel={onCancelSpy}
        onIdentify={onIdentifySpy}
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

  // TODO: add ConfusedWith tests

  it('should not render Questions with choice without questions', function () {
    wrapper.setProps({ choiceId: 'FR' })
    expect(wrapper.find(Questions)).to.have.lengthOf(0)
  })

  it('should render Questions with choice with questions', function () {
    wrapper.setProps({ choiceId: 'CRCL' })
    expect(wrapper.find(Questions)).to.have.lengthOf(1)
  })

  it('should call onCancel when "Not this" button clicked', function () {
    wrapper.find(Button).simulate('click')
    expect(onCancelSpy).to.have.been.calledOnce()
  })

  it('should call onIdentify when "Identify" button clicked', function () {
    wrapper.find(PrimaryButton).simulate('click')
    expect(onIdentifySpy).to.have.been.calledOnce()
  })
})
