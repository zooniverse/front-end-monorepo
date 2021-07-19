import { shallow } from 'enzyme'
import { Button, Carousel } from 'grommet'
import { types } from 'mobx-state-tree'
import React from 'react'
import sinon from 'sinon'
import { PrimaryButton } from '@zooniverse/react-components'

import { task as mockTask } from '@plugins/tasks/SurveyTask/mock-data'
import { default as Task } from '@plugins/tasks/SurveyTask'
import Choice from './Choice'
import ConfusedWith from './components/ConfusedWith'
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

  const handleDeleteSpy = sinon.spy()
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
        choiceId='KD'
        handleDelete={handleDeleteSpy}
        onIdentify={onIdentifySpy}
        task={task}
      />
    )
  })

  it('should render without crashing', function () {
    expect(wrapper).to.be.ok()
  })

  describe('with choice with images, confusions, and questions', function () {
    // choice 'KD' (Kudu) includes images, confusions, and questions

    it('should render Carousel', function () {
      expect(wrapper.find(Carousel)).to.have.lengthOf(1)
    })

    it('should render ConfusedWith', function () {
      expect(wrapper.find(ConfusedWith)).to.have.lengthOf(1)
    })

    it('should render Questions', function () {
      expect(wrapper.find(Questions)).to.have.lengthOf(1)
    })
  })

  describe('with choice without images, with confusions', function () {
    // choice 'NTHNGHR' (Nothing here) excludes images, includes confusions

    before(function () {
      wrapper.setProps({ choiceId: 'NTHNGHR' })
    })

    it('should not render Carousel', function () {
      expect(wrapper.find(Carousel)).to.have.lengthOf(0)
    })

    it('should have ConfusedWith with hasFocus true', function () {
      expect(wrapper.find(ConfusedWith).props().hasFocus).to.be.true()
    })
  })

  describe('with choice without images or confusions, with questions', function () {
    // choice 'HMN' (Human) excludes images and confusions, includes questions

    before(function () {
      wrapper.setProps({ choiceId: 'HMN' })
    })

    it('should not render ConfusedWith', function () {
      wrapper.setProps({ choiceId: 'HMN' })
      expect(wrapper.find(ConfusedWith)).to.have.lengthOf(0)
    })

    it('should have Questions with hasFocus true', function () {
      expect(wrapper.find(Questions).props().hasFocus).to.be.true()
    })
  })

  describe('with choice without more than 1 image, confusions, or questions', function () {
    // choice 'FR' (Fire) has 1 image, excludes confusions and questions

    before(function () {
      wrapper.setProps({ choiceId: 'FR' })
    })

    it('should not render Questions', function () {
      expect(wrapper.find(Questions)).to.have.lengthOf(0)
    })

    it('should have "Identify" button with autoFocus true', function () {
      expect(wrapper.find(PrimaryButton).props().autoFocus).to.be.true()
    })
  })

  it('should call handleDelete when "Not this" button clicked', function () {
    wrapper.find(Button).simulate('click')
    expect(handleDeleteSpy).to.have.been.calledOnceWith('KD')
  })

  it('should call onIdentify when "Identify" button clicked', function () {
    wrapper.find(PrimaryButton).simulate('click')
    expect(onIdentifySpy).to.have.been.calledOnce()
  })
})
